"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";

const API_BASE = "https://api.livinit.ai/api/v1/templates/livinit";

const TemplateDetailModelViewer = dynamic(
  () => import("@/components/template-detail-model-viewer"),
  { ssr: false }
);

export type LivinitTemplate = {
  id: number;
  model_id: string;
  style: string;
  size_room: string;
  no_of_assets: number;
  total_cost: string;
  image_url: string;
  model_usdz: string;
  model_glb: string;
  created_at: string;
};

/**
 * Product/asset shape matching iOS TemplateAssetDTO (Supabase template_assets).
 * API may return snake_case: asset_name, asset_url, product_url, cost, description.annotations.category
 */
export type TemplateProduct = {
  id?: number | string;
  template_id?: number;
  model_id?: string;
  asset_name?: string;
  asset_url?: string;
  product_url?: string;
  cost?: string;
  description?: {
    annotations?: { category?: string };
    [key: string]: unknown;
  };
  name?: string;
  title?: string;
  brand?: string;
  price?: string;
  link?: string;
  image_url?: string;
  image?: string;
  [key: string]: unknown;
};

type TemplateDetailResponse = {
  template?: LivinitTemplate;
  products?: TemplateProduct[];
  [key: string]: unknown;
};

function formatTitle(style: string, sizeRoom: string): string {
  const s = style.charAt(0).toUpperCase() + style.slice(1).toLowerCase();
  const r = sizeRoom.charAt(0).toUpperCase() + sizeRoom.slice(1).toLowerCase();
  return `${s} · ${r}`;
}

function getProductLink(p: TemplateProduct): string | undefined {
  return p.product_url ?? p.link ?? (typeof p.url === "string" ? p.url : undefined);
}

/** Match iOS: name from description.annotations.category ?? asset_name ?? "Furniture" */
function getProductName(p: TemplateProduct): string {
  const category = p.description?.annotations?.category;
  if (category) return category.charAt(0).toUpperCase() + category.slice(1).toLowerCase();
  if (p.asset_name) return p.asset_name;
  return (p.name ?? p.title ?? "Furniture") as string;
}

/** Match iOS: price from cost */
function getProductPrice(p: TemplateProduct): string {
  return (p.cost ?? p.price ?? "") as string;
}

/** Match iOS: location from product URL host (e.g. artemest.com -> Artemest) */
function getProductBrand(p: TemplateProduct): string {
  if (p.brand) return p.brand as string;
  const url = getProductLink(p);
  if (!url) return "";
  try {
    const host = new URL(url).host;
    const siteName = host.split(".")[0];
    return siteName ? siteName.charAt(0).toUpperCase() + siteName.slice(1) : host;
  } catch {
    return "";
  }
}

/** Match iOS: image from asset_url (or image_url/image/thumbnail) */
function getProductImage(p: TemplateProduct): string | undefined {
  return (p.asset_url ?? p.image_url ?? p.image ?? p.thumbnail) as string | undefined;
}

const XIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

export default function TemplateDetailPage() {
  const params = useParams();
  const id = params?.id as string | undefined;
  const [template, setTemplate] = useState<LivinitTemplate | null>(null);
  const [products, setProducts] = useState<TemplateProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    let cancelled = false;

    async function fetchTemplateAndProducts() {
      try {
        setLoading(true);
        setError(null);
        
        // First, get the template details
        const templateRes = await fetch(`${API_BASE}/${id}`, {
          headers: { Accept: "application/json" },
        });
        if (!templateRes.ok) {
          if (templateRes.status === 404) throw new Error("Template not found");
          throw new Error(`Failed to load template (${templateRes.status})`);
        }
        const templateData = (await templateRes.json()) as TemplateDetailResponse;

        if (cancelled) return;

        // Set template data
        let templateObj: LivinitTemplate | null = null;
        if (templateData.template) {
          templateObj = templateData.template;
        } else if (templateData.id) {
          templateObj = templateData as unknown as LivinitTemplate;
        }
        
        if (templateObj) {
          setTemplate(templateObj);

          // Fetch products: iOS uses model_id (e.g. "model 35") for template_assets. Try same pattern + template id.
          let productsData: TemplateProduct[] = [];
          const productsBase = "https://api.livinit.ai/api/v1";
          const modelId = templateObj.model_id?.trim();
          const encodedModelId = modelId ? encodeURIComponent(templateObj.model_id) : "";

          const parseProducts = (data: unknown): TemplateProduct[] => {
            if (Array.isArray(data)) return data as TemplateProduct[];
            if (data && typeof data === "object" && Array.isArray((data as { products?: unknown }).products))
              return (data as { products: TemplateProduct[] }).products;
            if (data && typeof data === "object" && Array.isArray((data as { product_list?: unknown }).product_list))
              return (data as { product_list: TemplateProduct[] }).product_list;
            return [];
          };

          // 1) GET /api/v1/templates/livinit/{id}/products (template numeric id)
          if (productsData.length === 0) {
            try {
              const res = await fetch(`${API_BASE}/${templateObj.id}/products`, {
                headers: { Accept: "application/json" },
              });
              if (res.ok) productsData = parseProducts(await res.json());
            } catch {
              /* try next */
            }
          }

          // 2) GET /api/v1/products?template_id={id}
          if (productsData.length === 0) {
            try {
              const res = await fetch(`${productsBase}/products?template_id=${templateObj.id}`, {
                headers: { Accept: "application/json" },
              });
              if (res.ok) productsData = parseProducts(await res.json());
            } catch {
              /* try next */
            }
          }

          // 3) GET /api/v1/products?model_id={model_id} – matches iOS TemplateAssetService (model_id=eq."model 35")
          if (productsData.length === 0 && encodedModelId) {
            try {
              const res = await fetch(`${productsBase}/products?model_id=${encodedModelId}`, {
                headers: { Accept: "application/json" },
              });
              if (res.ok) productsData = parseProducts(await res.json());
            } catch {
              /* try next */
            }
          }

          // 4) POST /api/v1/templates/products with template_id in body
          if (productsData.length === 0) {
            try {
              const res = await fetch(`${productsBase}/templates/products`, {
                method: "POST",
                headers: { Accept: "application/json", "Content-Type": "application/json" },
                body: JSON.stringify({ template_id: templateObj.id }),
              });
              if (res.ok) productsData = parseProducts(await res.json());
            } catch {
              /* try next */
            }
          }

          // 5) POST with model_id in body (match iOS key)
          if (productsData.length === 0 && modelId) {
            try {
              const res = await fetch(`${productsBase}/templates/products`, {
                method: "POST",
                headers: { Accept: "application/json", "Content-Type": "application/json" },
                body: JSON.stringify({ model_id: templateObj.model_id }),
              });
              if (res.ok) productsData = parseProducts(await res.json());
            } catch {
              /* show empty state */
            }
          }

          if (!cancelled) setProducts(productsData);
        }

        // If template response already includes products, use them
        if (Array.isArray(templateData.products) && !cancelled)
          setProducts(templateData.products as TemplateProduct[]);
        else if (Array.isArray(templateData.product_list) && !cancelled)
          setProducts(templateData.product_list as TemplateProduct[]);

      } catch (e) {
        if (!cancelled)
          setError(e instanceof Error ? e.message : "Could not load template");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchTemplateAndProducts();
    return () => {
      cancelled = true;
    };
  }, [id]);

  if (!id) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-12">
        <p className="text-gray-400">Invalid template.</p>
        <Link href="/templates" className="mt-4 inline-block text-indigo-400 hover:underline">
          ← All templates
        </Link>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-2 border-indigo-500 border-t-transparent" />
      </div>
    );
  }

  if (error || !template) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-12 text-center">
        <p className="text-red-400">{error ?? "Template not found"}</p>
        <Link href="/templates" className="mt-4 inline-block text-indigo-400 hover:underline">
          ← All templates
        </Link>
      </div>
    );
  }

  const title = formatTitle(template.style, template.size_room);

  return (
    <div className="relative min-h-screen">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 md:py-12">
        {/* Same layout as TemplateModal: two columns */}
        <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 shadow-2xl backdrop-blur-md">
          <Link
            href="/templates"
            className="absolute right-6 top-6 z-10 rounded-full p-2 text-white transition-colors hover:bg-white/10"
            aria-label="Back to templates"
          >
            <XIcon />
          </Link>
          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Left: 3D model (not image), title, Total Set Price */}
            <div className="border-b border-white/5 p-8 md:border-b-0 md:border-r">
              <div className="mb-6 aspect-square w-full overflow-hidden rounded-2xl bg-gray-950">
                <TemplateDetailModelViewer modelGlb={template.model_glb} alt={title} />
              </div>
              <h2 className="mb-2 text-3xl font-bold text-white">{title}</h2>
              <p className="mb-6 text-gray-400">
                {template.style} · {template.size_room}
              </p>
              <div className="rounded-2xl border border-indigo-500/20 bg-indigo-500/5 p-6">
                <p className="mb-1 text-xs uppercase tracking-widest text-gray-400">Total Set Price</p>
                <p className="text-2xl font-bold text-indigo-400">{template.total_cost}</p>
              </div>
            </div>

            {/* Right: Included Items list */}
            <div className="p-8">
              <h4 className="mb-6 text-sm font-bold uppercase tracking-widest text-gray-500">
                Included Items ({products.length > 0 ? products.length : template.no_of_assets})
              </h4>
              {products.length === 0 ? (
                <div className="rounded-2xl border border-white/5 bg-white/5 px-6 py-10 text-center">
                  <p className="text-gray-400">
                    No product list for this template yet. Product list is loaded when you pass template id to the API.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {products.map((p, i) => {
                    const link = getProductLink(p);
                    const name = getProductName(p);
                    const price = getProductPrice(p);
                    const brand = getProductBrand(p);
                    const img = getProductImage(p);
                    const row = (
                      <div className="flex flex-grow items-center gap-4">
                        {img ? (
                          <img
                            src={img}
                            alt=""
                            className="h-16 w-16 shrink-0 rounded-lg object-cover bg-gray-800"
                            onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                          />
                        ) : (
                          <div className="h-16 w-16 shrink-0 rounded-lg bg-white/10" />
                        )}
                        <div className="min-w-0 flex-grow">
                          <p className="truncate text-sm font-bold text-white">{name}</p>
                          {brand && <p className="text-xs text-gray-500">{brand}</p>}
                        </div>
                        <div className="shrink-0 text-right">
                          <p className="text-sm font-bold text-indigo-400">{price}</p>
                          {link && (
                            <span className="mt-1 block text-xs font-semibold text-indigo-400">
                              Buy at retailer →
                            </span>
                          )}
                        </div>
                      </div>
                    );
                    return link ? (
                      <a
                        key={p.id ?? i}
                        href={link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-4 rounded-2xl border border-white/5 bg-white/5 p-4 transition-all hover:border-white/20 group"
                      >
                        {row}
                      </a>
                    ) : (
                      <div
                        key={p.id ?? i}
                        className="flex items-center gap-4 rounded-2xl border border-white/5 bg-white/5 p-4 transition-all group hover:border-white/20"
                      >
                        {row}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>

        <Link
          href="/templates"
          className="mt-6 inline-flex items-center gap-2 text-sm font-medium uppercase tracking-wider text-gray-400 transition-colors hover:text-indigo-400"
        >
          ← All templates
        </Link>
      </div>
    </div>
  );
}
