import { NextRequest } from "next/server";

/**
 * Image proxy: fetch external image server-side and stream it.
 * Bypasses hotlink blocking (retailers block <img> from other domains).
 * Browser loads from our domain so the image displays.
 */
export async function GET(request: NextRequest) {
  const url = request.nextUrl.searchParams.get("url");
  if (!url || typeof url !== "string") {
    return new Response(null, { status: 400 });
  }
  let imageUrl: URL;
  try {
    imageUrl = new URL(url);
  } catch {
    return new Response(null, { status: 400 });
  }
  if (!["http:", "https:"].includes(imageUrl.protocol)) {
    return new Response(null, { status: 400 });
  }

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10000);
    const res = await fetch(imageUrl.toString(), {
      signal: controller.signal,
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        Accept: "image/webp,image/apng,image/*,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.9",
      },
      redirect: "follow",
    });
    clearTimeout(timeout);

    if (!res.ok) {
      return new Response(null, { status: res.status });
    }

    const contentType = res.headers.get("content-type") || "image/jpeg";
    const cacheControl = res.headers.get("cache-control") || "public, max-age=86400, stale-while-revalidate=604800";
    const body = res.body;
    if (!body) {
      return new Response(null, { status: 502 });
    }

    return new Response(body, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Cache-Control": cacheControl,
      },
    });
  } catch {
    return new Response(null, { status: 502 });
  }
}
