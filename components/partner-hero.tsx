"use client";

export default function PartnerHero() {
  return (
    <section className="relative overflow-hidden pb-6 md:pb-8 pt-8 md:pt-12">
      <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6">
        <div className="py-8 md:py-12">
          <div className="pb-4 md:pb-6 text-center">
            {/* Headline */}
            <h1 className="font-nacelle text-4xl font-semibold leading-tight tracking-tight text-white md:text-5xl lg:text-6xl">
              Partner with{" "}
              <span className="bg-linear-to-r from-indigo-400 via-purple-400 to-indigo-500 bg-clip-text text-transparent">
                LIVINIT.
              </span>
            </h1>

            <div className="mx-auto mt-6 max-w-2xl">
              <p className="mb-8 text-lg text-gray-300 leading-relaxed">
                Transform your furniture catalog into an AI-powered shopping
                experience. Join leading retailers already on our platform.
              </p>

              {/* Email + Schedule Demo CTA */}
              <form
                className="mx-auto flex max-w-lg flex-col gap-3 sm:flex-row sm:items-stretch sm:justify-center"
                onSubmit={(e) => e.preventDefault()}
              >
                <input
                  type="email"
                  placeholder="Enter your work email address..."
                  className="form-input min-h-11 flex-1 rounded-xl border border-gray-500 bg-gray-800/80 px-4 py-2.5 text-white placeholder-gray-400 transition-all duration-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30 sm:min-w-0"
                  aria-label="Work email"
                />
                <button
                  type="submit"
                  className="btn shrink-0 rounded-xl bg-indigo-600 px-6 py-2.5 font-medium text-white transition-all duration-300 hover:bg-indigo-500 hover:shadow-lg hover:shadow-indigo-500/25"
                >
                  Schedule Demo
                </button>
              </form>

              {/* Partner brands - horizontal marquee */}
              <div
                className="mx-auto mt-12 w-full max-w-4xl overflow-hidden"
                aria-hidden
              >
                <div className="hero-brands-marquee flex w-max items-center gap-x-12 sm:gap-x-16 md:gap-x-20">
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
