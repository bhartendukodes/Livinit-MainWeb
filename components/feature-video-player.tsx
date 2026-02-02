"use client";

import { useRef, useEffect } from "react";

type FeatureVideoPlayerProps = {
  src: string;
  ariaLabel: string;
};

export default function FeatureVideoPlayer({ src, ariaLabel }: FeatureVideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  // Seamless loop: ensure video restarts when it ends (backup for loop attribute)
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleEnded = () => {
      video.currentTime = 0;
      video.play().catch(() => {});
    };

    video.addEventListener("ended", handleEnded);
    return () => video.removeEventListener("ended", handleEnded);
  }, []);

  return (
    <div className="relative aspect-[9/16] w-full max-w-sm mx-auto overflow-hidden rounded-xl bg-gray-950 ring-1 ring-gray-700/50 shadow-2xl">
      <video
        ref={videoRef}
        src={src}
        className="h-full w-full object-contain"
        playsInline
        muted
        loop
        autoPlay
        preload="auto"
        aria-label={ariaLabel}
      />
      {/* Subtle bottom gradient for polish */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/40 to-transparent"
        aria-hidden
      />
    </div>
  );
}
