"use client";

import "@google/model-viewer";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import ProductPreviewImage from "@/components/product-preview-image";

const API_BASE = "https://api.livinit.ai/api/v1/templates";

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

export type TemplateProduct = {
  id?: number | string;
  asset_name?: string;
  asset_url?: string;
  product_url?: string;
  cost?: string;
  description?: { annotations?: { category?: string } };
  name?: string;
  title?: string;
  brand?: string;
  price?: string;
  link?: string;
  image_url?: string;
  image?: string;
  product_image?: string;
  thumbnail?: string;
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
function getProductName(p: TemplateProduct): string {
  const category = p.description?.annotations?.category;
  if (category) return category.charAt(0).toUpperCase() + category.slice(1).toLowerCase();
  if (p.asset_name) return p.asset_name;
  return (p.name ?? p.title ?? "Furniture") as string;
}
function getProductPrice(p: TemplateProduct): string {
  return (p.cost ?? p.price ?? "") as string;
}
function getProductImage(p: TemplateProduct): string | undefined {
  const img =
    (p.product_image ?? p.image_url ?? p.image ?? p.thumbnail) as string | undefined;
  if (img) return img;
  const asset = p.asset_url as string | undefined;
  if (asset && /\.(png|jpe?g|webp|gif|svg)(\?|$)/i.test(asset)) return asset;
  return undefined;
}

const XIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

function parseProducts(data: unknown): TemplateProduct[] {
  if (Array.isArray(data)) return data as TemplateProduct[];
  if (data && typeof data === "object" && Array.isArray((data as { products?: unknown }).products))
    return (data as { products: TemplateProduct[] }).products;
  if (data && typeof data === "object" && Array.isArray((data as { product_list?: unknown }).product_list))
    return (data as { product_list: TemplateProduct[] }).product_list;
  return [];
}

async function fetchProductsForTemplate(template: LivinitTemplate): Promise<TemplateProduct[]> {
  const modelId = template.model_id?.trim();
  if (!modelId) return [];
  try {
    const res = await fetch(`${API_BASE}/products-by-model`, {
      method: "POST",
      headers: { Accept: "application/json", "Content-Type": "application/json" },
      body: JSON.stringify({ model_id: template.model_id }),
    });
    if (!res.ok) return [];
    const data = (await res.json()) as { products?: TemplateProduct[] };
    return Array.isArray(data.products) ? data.products : [];
  } catch {
    return [];
  }
}

export default function TemplateModal({
  template,
  onClose,
}: {
  template: LivinitTemplate;
  onClose: () => void;
}) {
  const [products, setProducts] = useState<TemplateProduct[]>([]);
  const [productsLoading, setProductsLoading] = useState(true);
  const title = formatTitle(template.style, template.size_room);

  useEffect(() => {
    let cancelled = false;
    fetchProductsForTemplate(template).then((list) => {
      if (!cancelled) {
        setProducts(list);
        setProductsLoading(false);
      }
    });
    return () => { cancelled = true; };
  }, [template.id, template.model_id]);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" onClick={onClose} aria-hidden />
      <div className="relative flex max-h-[90vh] w-full max-w-6xl flex-col overflow-hidden rounded-[2rem] border border-white/10 bg-gray-900 shadow-2xl md:flex-row">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 z-20 rounded-full p-2 text-white transition-colors hover:bg-white/10"
          aria-label="Close"
        >
          <XIcon />
        </button>

        {/* Left: 3D model (not image) */}
        <div className="relative flex min-h-[280px] flex-1 basis-1/2">
          <div className="relative h-full w-full min-h-[280px] bg-gray-950">
            {React.createElement("model-viewer", {
              src: template.model_glb,
              alt: `${title} – 3D model`,
              "camera-controls": true,
              "auto-rotate": true,
              style: { width: "100%", height: "100%", minHeight: "280px" },
            })}
          </div>
        </div>

        {/* Right: Title + Total + Product list with Buy links */}
        <div className="flex flex-1 basis-1/2 flex-col overflow-y-auto border-t border-white/10 p-6 md:border-t-0 md:border-l md:p-8">
          <h2 className="text-2xl font-bold text-white md:text-3xl">{title}</h2>
          <p className="mt-1 text-gray-400">{template.style} · {template.size_room}</p>
          <div className="mt-4 rounded-xl border border-indigo-500/20 bg-indigo-500/5 p-4">
            <p className="text-xs uppercase tracking-wider text-gray-400">Total Set Price</p>
            <p className="text-xl font-bold text-indigo-400">{template.total_cost}</p>
          </div>

          <h4 className="mt-6 text-sm font-bold uppercase tracking-wider text-gray-500">
            Included Items ({productsLoading ? "…" : products.length || template.no_of_assets})
          </h4>
          {productsLoading ? (
            <div className="mt-3 flex items-center gap-2 text-gray-400">
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-indigo-500 border-t-transparent" />
              <span className="text-sm">Loading products…</span>
            </div>
          ) : products.length === 0 ? (
            <p className="mt-3 text-sm text-gray-500">No product list available for this template.</p>
          ) : (
            <ul className="mt-3 space-y-3">
              {products.map((p, i) => {
                const link = getProductLink(p);
                const name = getProductName(p);
                const price = getProductPrice(p);
                const img = getProductImage(p);
                return (
                  <li
                    key={p.id ?? i}
                    className="flex items-center gap-4 rounded-xl border border-white/5 bg-white/5 p-3"
                  >
                    <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-gray-800">
                      <ProductPreviewImage
                        imageUrl={img}
                        productUrl={link}
                        className="h-full w-full object-contain"
                        alt=""
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-white">{name}</p>
                      {price && <p className="text-xs text-indigo-400">{price}</p>}
                    </div>
                    {link ? (
                      <a
                        href={link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="shrink-0 rounded-lg bg-indigo-500 px-3 py-2 text-xs font-semibold text-white transition hover:bg-indigo-600"
                      >
                        Buy
                      </a>
                    ) : null}
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
