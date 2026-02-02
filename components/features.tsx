import Image from "next/image";

import Illustration from "@/public/images/page-illustration.svg";
import BlurredShapeGray from "@/public/images/blurred-shape-gray.svg";
import BlurredShape from "@/public/images/blurred-shape.svg";

const FEATURE_IMAGES = {
  promptToReality:
    "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&q=80",
  instantIteration:
    "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80",
  styleMatcher:
    "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800&q=80",
};

export default function Features() {
  return (
    <section className="relative overflow-hidden border-t border-gray-800 py-16 md:py-20">
      {/* Illustration background - aligned with PageIllustration style */}
      <div
        className="pointer-events-none absolute right-0 top-0 -z-10 translate-x-1/4 opacity-[0.35]"
        aria-hidden
      >
        <Image
          className="max-w-none"
          src={Illustration}
          width={846}
          height={594}
          alt=""
        />
      </div>
      <div
        className="pointer-events-none absolute bottom-1/4 left-0 -z-10 -translate-x-1/2 opacity-20"
        aria-hidden
      >
        <Image
          className="max-w-none"
          src={BlurredShapeGray}
          width={760}
          height={668}
          alt=""
        />
      </div>
      <div
        className="pointer-events-none absolute right-0 top-1/2 -z-10 translate-x-1/3 opacity-20"
        aria-hidden
      >
        <Image
          className="max-w-none"
          src={BlurredShape}
          width={760}
          height={668}
          alt=""
        />
      </div>
      {/* Gradient overlay so content stays readable */}
      <div
        className="pointer-events-none absolute inset-0 -z-[5] bg-gradient-to-r from-gray-950/60 via-gray-950/40 to-transparent md:from-gray-950/50 md:via-transparent"
        aria-hidden
      />

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6">
        {/* Section header */}
        <div className="mb-14 md:mb-16 text-center">
          <div className="mb-3 flex items-center justify-center gap-2">
            <div className="h-2 w-2 rounded-full bg-indigo-500" />
            <span className="text-sm font-medium uppercase tracking-wider text-gray-400">
              Advance controls
            </span>
          </div>
          <h2 className="mb-4 font-nacelle text-3xl font-semibold text-white md:text-4xl">
            Design with Ease,{" "}
            <span className="bg-linear-to-r from-indigo-400 via-purple-400 to-indigo-500 bg-clip-text text-transparent">
              Live in Reality.
            </span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-300">
            From empty rooms to curated layouts, LIVINIT&apos;s spatial
            intelligence handles the math so you can focus on the mood.
          </p>
        </div>

        {/* 01 PROMPT-TO-REALITY */}
        <div className="mb-20 grid gap-10 md:grid-cols-2 md:items-center md:gap-14">
          <div className="md:pr-4">
            <span className="mb-4 inline-flex items-center gap-2">
              <span className="rounded-full bg-indigo-500/20 px-3 py-1 text-sm font-semibold text-indigo-400">
                01
              </span>
              <span className="font-nacelle text-xl font-semibold uppercase tracking-wider text-indigo-400 md:text-2xl">
                Prompt-to-reality
              </span>
            </span>
            <h3 className="mb-3 text-sm font-semibold text-white">
              Design the entire room with a single prompt
            </h3>
            <p className="text-gray-300 leading-relaxed">
              Describe your dream space in plain words—our AI generates a fully
              furnished room using real, shoppable products that fit your style
              and budget. No guesswork, no endless scrolling.
            </p>
          </div>
          <div className="relative overflow-hidden rounded-2xl border border-gray-700/50 bg-gray-900/90 shadow-xl">
            <div className="aspect-[4/3] w-full overflow-hidden">
              <Image
                src={FEATURE_IMAGES.promptToReality}
                alt="AI-generated modern living room with real furniture"
                width={600}
                height={450}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="flex items-center justify-between border-t border-gray-700/50 bg-gray-900/95 px-4 py-3 backdrop-blur-sm">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-emerald-500" />
                <span className="text-xs font-medium uppercase tracking-wider text-white">
                  AI Generative Engine
                </span>
              </div>
              <span className="text-xs font-medium text-gray-400">
                100% Reality Sync ✓
              </span>
            </div>
          </div>
        </div>

        {/* 02 INSTANT ITERATION */}
        <div className="mb-20 grid gap-10 md:grid-cols-2 md:items-center md:gap-14">
          <div className="relative overflow-hidden rounded-2xl border border-gray-700/50 bg-gray-900/90 shadow-xl md:order-1">
            <div className="aspect-[4/3] w-full overflow-hidden">
              <Image
                src={FEATURE_IMAGES.instantIteration}
                alt="Living room with sofa—swap items instantly"
                width={600}
                height={450}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="grid grid-cols-2 gap-3 border-t border-gray-700/50 bg-gray-900/95 p-3 backdrop-blur-sm">
              <div className="rounded-lg bg-gray-800/90 px-3 py-2">
                <p className="text-[10px] font-medium uppercase tracking-wider text-gray-400">
                  CRATE & BARREL
                </p>
                <p className="mt-0.5 font-semibold text-white">Sven Sofa</p>
                <p className="text-sm text-indigo-400">$1,299</p>
              </div>
              <div className="rounded-lg bg-gray-800/90 px-3 py-2">
                <p className="text-[10px] font-medium uppercase tracking-wider text-gray-400">
                  WEST ELM
                </p>
                <p className="mt-0.5 font-semibold text-white">Mid-Century Chair</p>
                <p className="text-sm text-indigo-400">$899</p>
              </div>
            </div>
          </div>
          <div className="md:order-2 md:pl-4">
            <span className="mb-4 inline-flex items-center gap-2">
              <span className="rounded-full bg-indigo-500/20 px-3 py-1 text-sm font-semibold text-indigo-400">
                02
              </span>
              <span className="font-nacelle text-xl font-semibold uppercase tracking-wider text-indigo-400 md:text-2xl">
                Instant iteration
              </span>
            </span>
            <h3 className="mb-3 text-sm font-semibold text-white">
              Swap any piece and see it in your space instantly
            </h3>
            <p className="text-gray-300 leading-relaxed">
              Not sold on the sofa? Tap to swap it with alternatives—see each
              option rendered in your actual room in real time. Compare styles,
              prices, and fit without leaving the app.
            </p>
          </div>
        </div>

        {/* 03 STYLE MATCHER */}
        <div className="grid gap-10 md:grid-cols-2 md:items-center md:gap-14">
          <div className="md:pr-4">
            <span className="mb-4 inline-flex items-center gap-2">
              <span className="rounded-full bg-indigo-500/20 px-3 py-1 text-sm font-semibold text-indigo-400">
                03
              </span>
              <span className="font-nacelle text-xl font-semibold uppercase tracking-wider text-indigo-400 md:text-2xl">
                Style matcher
              </span>
            </span>
            <h3 className="mb-3 text-sm font-semibold text-white">
              Find products that complement your existing furniture
            </h3>
            <p className="text-gray-300 leading-relaxed">
              Upload a photo of what you already own. We analyze your pieces and
              suggest new items that match your style, scale, and color
              palette—so every addition feels like it was always meant to be
              there.
            </p>
          </div>
          <div className="relative overflow-hidden rounded-2xl border border-gray-700/50 bg-gray-900/90 shadow-xl">
            <div className="aspect-[4/3] w-full overflow-hidden">
              <Image
                src={FEATURE_IMAGES.styleMatcher}
                alt="Style matching—upload your furniture, get matching suggestions"
                width={600}
                height={450}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="absolute inset-0 flex items-center justify-center bg-gray-900/70 backdrop-blur-[3px]">
              <div className="rounded-2xl border-2 border-dashed border-white/25 bg-gray-900/60 px-6 py-5 text-center">
                <p className="text-sm font-medium text-white">
                  Upload photo of your furniture
                </p>
                <p className="mt-1 text-xs text-gray-400">
                  We&apos;ll suggest perfectly matching pieces
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
