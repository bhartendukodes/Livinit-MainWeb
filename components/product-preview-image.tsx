"use client";

import { useState, useEffect } from "react";

const PlaceholderIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

const LoaderSpinner = ({ className }: { className?: string }) => (
  <div
    className={className}
    role="status"
    aria-label="Loading preview"
  >
    <div className="h-6 w-6 animate-spin rounded-full border-2 border-indigo-500/30 border-t-indigo-400" />
  </div>
);

export default function ProductPreviewImage({
  imageUrl: initialImageUrl,
  productUrl,
  className = "h-full w-full object-contain",
  alt = "",
}: {
  imageUrl?: string | null;
  productUrl?: string | null;
  className?: string;
  alt?: string;
}) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [previewFailed, setPreviewFailed] = useState(false);
  const [loading, setLoading] = useState(false);
  const imageUrl = initialImageUrl || previewUrl;

  useEffect(() => {
    if (initialImageUrl || !productUrl || previewFailed) {
      setLoading(false);
      return;
    }
    let cancelled = false;
    setLoading(true);
    const encoded = encodeURIComponent(productUrl);
    const doFetch = (retry = 0) => {
      fetch(`/api/product-preview?url=${encoded}`)
        .then((r) => r.json())
        .then((data: { imageUrl?: string | null }) => {
          if (cancelled) return;
          if (data.imageUrl) {
            setPreviewUrl(data.imageUrl);
          } else if (retry < 1) {
            setTimeout(() => doFetch(1), 800);
            return;
          } else {
            setPreviewFailed(true);
          }
          setLoading(false);
        })
        .catch(() => {
          if (cancelled) return;
          if (retry < 1) {
            setTimeout(() => doFetch(1), 800);
            return;
          }
          setPreviewFailed(true);
          setLoading(false);
        });
    };
    doFetch();
    return () => {
      cancelled = true;
      setLoading(false);
    };
  }, [initialImageUrl, productUrl, previewFailed]);

  const showImg = imageUrl && !previewFailed;

  return (
    <>
      {showImg ? (
        <img
          src={imageUrl}
          alt={alt}
          className={className}
          onError={() => {
            setPreviewFailed(true);
            setPreviewUrl(null);
          }}
        />
      ) : null}
      <div
        className={`absolute inset-0 flex items-center justify-center bg-gray-800/80 ${showImg ? "hidden" : ""}`}
        aria-hidden
      >
        {loading ? (
          <LoaderSpinner />
        ) : (
          <PlaceholderIcon className="h-6 w-6 text-gray-500" />
        )}
      </div>
    </>
  );
}
