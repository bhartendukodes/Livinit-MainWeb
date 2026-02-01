"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const SLIDES = [
  {
    id: 1,
    title: "Modern Minimalist",
    image:
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=900&q=85",
    price: "$3,200",
    alt: "Modern minimalist living room",
  },
  {
    id: 2,
    title: "Boho Retreat",
    image:
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=900&q=85",
    price: "$2,840",
    alt: "Boho living room with plants and leather sofa",
  },
  {
    id: 3,
    title: "Industrial Vibe",
    image:
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=900&q=85",
    price: "$6,120",
    alt: "Industrial style living space",
  },
  {
    id: 4,
    title: "Copenhagen",
    image:
      "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=900&q=85",
    price: "$3,290",
    alt: "Scandinavian bedroom",
  },
];

export default function MadeWithLivinit() {
  const [current, setCurrent] = useState(0);
  const slide = SLIDES[current];

  return (
    <section className="relative overflow-hidden border-t border-gray-800 py-12 md:py-16">
      {/* Background – orbs + gradient + dot grid (visible) */}
      <div
        className="section-bg-float pointer-events-none absolute -left-1/4 top-1/4 -z-10 h-[50vmin] w-[50vmin] rounded-full bg-purple-500/30 blur-[60px]"
        aria-hidden
      />
      <div
        className="section-bg-float-slow pointer-events-none absolute -right-1/4 bottom-1/4 -z-10 h-[55vmin] w-[55vmin] rounded-full bg-indigo-500/30 blur-[60px]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-purple-950/15 to-transparent"
        aria-hidden
      />
      <div
        className="section-bg-grid-purple pointer-events-none absolute inset-0 -z-10 opacity-60"
        aria-hidden
      />

      <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6">
        {/* Header - centered */}
        <div className="mb-10 text-center md:mb-12">
          <h2 className="font-nacelle text-3xl font-bold text-white md:text-4xl">
            Made with Livinit
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-gray-300">
            Real rooms. Real products. Real budgets.
          </p>
          <Link
            href="/catalog"
            className="group mt-4 inline-flex items-center gap-2 text-sm font-medium uppercase tracking-wider text-gray-400 transition-colors hover:text-indigo-400"
          >
            View full catalog
            <span className="transition-transform group-hover:translate-x-1">
              →
            </span>
          </Link>
        </div>

        {/* Single large card carousel */}
        <div className="relative">
          <div className="overflow-hidden rounded-3xl shadow-2xl ring-1 ring-gray-700/50">
            <div className="relative aspect-[16/10] w-full md:aspect-[2/1]">
              <Image
                src={slide.image}
                alt={slide.alt}
                width={900}
                height={500}
                className="h-full w-full object-cover"
                priority={current === 0}
              />

              {/* Bottom gradient overlay */}
              <div
                className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"
                aria-hidden
              />

              {/* Bottom-left text overlay */}
              <div className="absolute bottom-0 left-0 right-0 flex flex-wrap items-end justify-between gap-4 p-6 md:p-8">
                <div>
                  <h3 className="font-nacelle text-xl font-bold text-white md:text-2xl">
                    {slide.title}
                  </h3>
                  <p className="mt-1 text-sm text-white/90">
                    Designed in under 60 seconds
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xs font-medium uppercase tracking-wider text-white/80">
                    Total Room Cost
                  </p>
                  <p className="font-nacelle text-2xl font-bold text-white md:text-3xl">
                    {slide.price}
                  </p>
                </div>
              </div>

              {/* Carousel arrows */}
              <button
                type="button"
                onClick={() =>
                  setCurrent((c) => (c === 0 ? SLIDES.length - 1 : c - 1))
                }
                className="absolute left-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 text-gray-800 shadow-lg transition-all hover:bg-white hover:scale-105"
                aria-label="Previous slide"
              >
                <svg
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
              <button
                type="button"
                onClick={() =>
                  setCurrent((c) => (c === SLIDES.length - 1 ? 0 : c + 1))
                }
                className="absolute right-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 text-gray-800 shadow-lg transition-all hover:bg-white hover:scale-105"
                aria-label="Next slide"
              >
                <svg
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Carousel dots */}
          <div className="mt-6 flex justify-center gap-2">
            {SLIDES.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setCurrent(i)}
                className={`h-2.5 w-2.5 rounded-full transition-all ${
                  i === current
                    ? "bg-indigo-500 ring-2 ring-indigo-500/50 ring-offset-2 ring-offset-gray-950"
                    : "bg-gray-500 hover:bg-gray-400"
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
