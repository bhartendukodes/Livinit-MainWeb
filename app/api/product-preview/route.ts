import { NextRequest } from "next/server";

const OG_IMAGE_REGEX = /<meta[^>]*property=["']og:image["'][^>]*content=["']([^"']+)["']/i;
const OG_IMAGE_CONTENT_FIRST = /<meta[^>]*content=["']([^"']+)["'][^>]*property=["']og:image["']/i;
const TWITTER_IMAGE_REGEX = /<meta[^>]*name=["']twitter:image["'][^>]*content=["']([^"']+)["']/i;
const TWITTER_IMAGE_CONTENT_FIRST = /<meta[^>]*content=["']([^"']+)["'][^>]*name=["']twitter:image["']/i;

const CACHE_TTL_MS = 10 * 60 * 1000; // 10 min
const cache = new Map<string, { imageUrl: string | null; ts: number }>();

function extractOgImage(html: string): string | null {
  const match =
    html.match(OG_IMAGE_REGEX) ||
    html.match(OG_IMAGE_CONTENT_FIRST) ||
    html.match(TWITTER_IMAGE_REGEX) ||
    html.match(TWITTER_IMAGE_CONTENT_FIRST);
  if (!match) return null;
  let url = match[1].trim();
  if (url.startsWith("//")) url = "https:" + url;
  return url;
}

function toProxyUrl(request: NextRequest, imageUrl: string): string {
  const origin = request.nextUrl.origin;
  return `${origin}/api/product-preview-image?url=${encodeURIComponent(imageUrl)}`;
}

export async function GET(request: NextRequest) {
  const url = request.nextUrl.searchParams.get("url");
  if (!url || typeof url !== "string") {
    return Response.json({ imageUrl: null }, { status: 400 });
  }
  let targetUrl: URL;
  try {
    targetUrl = new URL(url);
  } catch {
    return Response.json({ imageUrl: null }, { status: 400 });
  }
  if (!["http:", "https:"].includes(targetUrl.protocol)) {
    return Response.json({ imageUrl: null }, { status: 400 });
  }

  const cacheKey = targetUrl.toString();
  const cached = cache.get(cacheKey);
  if (cached && Date.now() - cached.ts < CACHE_TTL_MS) {
    return Response.json({ imageUrl: cached.imageUrl });
  }

  const encodedUrl = encodeURIComponent(targetUrl.toString());
  let resultUrl: string | null = null;

  // 1) Direct fetch + og:image
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000);
    const res = await fetch(targetUrl.toString(), {
      signal: controller.signal,
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        Accept: "text/html,application/xhtml+xml",
        "Accept-Language": "en-US,en;q=0.9",
      },
      redirect: "follow",
    });
    clearTimeout(timeout);
    if (res.ok) {
      const html = await res.text();
      let imageUrl = extractOgImage(html);
      if (imageUrl) {
        if (imageUrl.startsWith("/")) imageUrl = new URL(imageUrl, targetUrl.origin).toString();
        resultUrl = toProxyUrl(request, imageUrl);
      }
    }
  } catch {
    /* fall through */
  }

  // 2) Microlink: og:image first, then screenshot so we always get an image when page loads
  if (!resultUrl) {
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 18000);
      const res = await fetch(
        `https://api.microlink.io?url=${encodedUrl}&screenshot=true&video=false`,
        { signal: controller.signal, headers: { Accept: "application/json" } }
      );
      clearTimeout(timeout);
      if (res.ok) {
        const data = (await res.json()) as {
          data?: { image?: { url?: string }; screenshot?: { url?: string } };
          status?: string;
        };
        const imageUrl =
          data.data?.image?.url || data.data?.screenshot?.url || null;
        if (imageUrl) resultUrl = toProxyUrl(request, imageUrl);
      }
    } catch {
      /* fall through */
    }
  }

  cache.set(cacheKey, { imageUrl: resultUrl, ts: Date.now() });
  return Response.json({ imageUrl: resultUrl });
}
