"use client";

import { useState, useEffect } from "react";

const TYPEWRITER_PROMPT =
  "Design a cozy minimalist living room with white furniture under $5000";
const TYPE_SPEED = 60;
const PAUSE_AFTER = 2500;
const RESTART_DELAY = 1500;

export default function HeroHome() {
  const [mounted, setMounted] = useState(false);
  const [typedText, setTypedText] = useState("");
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [userHasTyped, setUserHasTyped] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || userHasTyped) return;

    if (isPaused) {
      const restart = setTimeout(() => {
        setTypedText("");
        setIndex(0);
        setIsPaused(false);
      }, RESTART_DELAY);
      return () => clearTimeout(restart);
    }

    if (index < TYPEWRITER_PROMPT.length) {
      const t = setTimeout(() => {
        setTypedText((prev) => prev + TYPEWRITER_PROMPT[index]);
        setIndex((i) => i + 1);
      }, TYPE_SPEED);
      return () => clearTimeout(t);
    }

    const pause = setTimeout(() => setIsPaused(true), PAUSE_AFTER);
    return () => clearTimeout(pause);
  }, [mounted, index, isPaused, userHasTyped]);

  return (
    <section className="relative overflow-hidden pb-6 md:pb-8">
      <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6">
        <div className="py-8 md:py-10">
          <div className="pb-4 md:pb-6 text-center">
            <h1 className="font-nacelle text-4xl font-semibold leading-tight tracking-tight md:text-5xl lg:text-6xl space-y-1">
              <span
                className="hero-line hero-delay-0 block text-white animate-[hero-reveal_0.8s_ease-out_forwards]"
              >
                Real Design.
              </span>
              <span
                className="hero-line hero-delay-120 block text-white animate-[hero-reveal_0.8s_ease-out_forwards]"
              >
                Real Products.
              </span>
              <span
                className="hero-line hero-delay-240 block animate-[hero-reveal_0.8s_ease-out_forwards,hero-gradient_8s_ease-in-out_infinite] bg-[length:200%_auto] bg-clip-text bg-[linear-gradient(90deg,var(--color-indigo-300),var(--color-indigo-400),var(--color-indigo-300),var(--color-indigo-400))] text-transparent"
              >
                Real Simple.
              </span>
            </h1>

            <div className="mx-auto mt-6 max-w-2xl">
              <p
                className="hero-line hero-delay-360 mb-6 text-lg text-gray-300 animate-[hero-reveal_0.8s_ease-out_forwards] leading-relaxed"
              >
                LIVINIT uses advanced spatial intelligence to respect your
                floor plan, your budget, and the flow of your actual home.
              </p>

              {/* Typewriter prompt + Generate – dark theme */}
              <div
                className="hero-line hero-delay-480 mx-auto max-w-lg animate-[hero-reveal_0.8s_ease-out_forwards]"
              >
                <div className="flex flex-col gap-3 rounded-xl border border-gray-700/50 bg-gray-800/40 p-2 backdrop-blur-sm sm:flex-row sm:items-stretch sm:p-2.5">
                  <input
                    type="text"
                    value={typedText}
                    onChange={(e) => {
                      setUserHasTyped(true);
                      setTypedText(e.target.value);
                    }}
                    onFocus={() => setUserHasTyped(true)}
                    placeholder={userHasTyped ? "Describe your room..." : ""}
                    className="min-h-11 flex-1 rounded-lg border border-gray-600 bg-gray-800/80 px-4 py-2.5 text-white placeholder-gray-500 outline-none transition-all duration-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30 sm:min-w-0"
                    aria-label="Design prompt"
                  />
                  <a
                    href="#retail-reality-sync"
                    className="shrink-0 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 px-5 py-2.5 font-semibold text-white shadow-lg shadow-indigo-500/25 transition-all duration-300 hover:from-indigo-500 hover:to-purple-500 hover:shadow-indigo-500/30 text-center"
                  >
                    Try Beta.
                  </a>
                </div>
              </div>

              {/* Brands - horizontal marquee below CTA */}
              <div
                className="hero-line hero-delay-550 mx-auto mt-10 w-full max-w-4xl overflow-hidden animate-[hero-reveal_0.8s_ease-out_forwards]"
                aria-hidden
              >
                <div className="hero-brands-marquee flex w-max items-center gap-x-12 sm:gap-x-16 md:gap-x-20">
                  {/* First set */}
                  <span className="shrink-0 text-base font-medium text-gray-500">
                    WAYFAIR
                  </span>
                  <span className="shrink-0 text-base italic text-gray-400">
                    WEST ELM
                  </span>
                  <span className="shrink-0 text-base font-bold uppercase tracking-wide text-gray-500">
                    CRATE & BARREL
                  </span>
                  <span className="shrink-0 text-base font-medium uppercase tracking-wide text-gray-500">
                    Pottery Barn
                  </span>
                  {/* Duplicate for seamless loop */}
                  <span className="shrink-0 text-base font-medium text-gray-500">
                    WAYFAIR
                  </span>
                  <span className="shrink-0 text-base italic text-gray-400">
                    WEST ELM
                  </span>
                  <span className="shrink-0 text-base font-bold uppercase tracking-wide text-gray-500">
                    CRATE & BARREL
                  </span>
                  <span className="shrink-0 text-base font-medium uppercase tracking-wide text-gray-500">
                    Pottery Barn
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
