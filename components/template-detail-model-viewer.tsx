"use client";

import "@google/model-viewer";
import React from "react";

export default function TemplateDetailModelViewer({
  modelGlb,
  alt,
}: {
  modelGlb: string;
  alt: string;
}) {
  return (
    <div className="h-full w-full" style={{ minHeight: "280px" }}>
      {React.createElement("model-viewer", {
        src: modelGlb,
        alt,
        "camera-controls": true,
        "auto-rotate": true,
        style: { width: "100%", height: "100%", minHeight: "280px", display: "block" },
      })}
    </div>
  );
}
