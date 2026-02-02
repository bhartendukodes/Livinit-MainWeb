"use client";

const STATS = [
  { value: "40%", label: "Reduction in Returns" },
  { value: "3.2x", label: "Increase in Engagement" },
  { value: "25%", label: "Higher AOV" },
];

export default function PartnerStatsCard() {
  return (
    <section className="relative py-12 md:py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="stats-card-enter stats-card-glow group relative overflow-hidden rounded-3xl bg-gray-900 px-8 py-12 shadow-xl transition-all duration-500 hover:shadow-2xl md:px-12 md:py-16">
          {/* Background animation - moving dot grid */}
          <div
            className="section-bg-grid-stats pointer-events-none absolute inset-0 -z-[1] opacity-60"
            aria-hidden
          />
          {/* Decorative shapes - half circles & circles */}
          <div className="pointer-events-none absolute inset-0">
            {/* Animated orbs */}
            <div className="section-bg-float absolute -top-24 -right-24 h-48 w-48 rounded-full bg-indigo-500/40 blur-xl md:h-64 md:w-64" />
            <div className="section-bg-float-slow absolute -bottom-20 -left-20 h-40 w-40 rounded-full bg-purple-500/35 blur-xl md:h-56 md:w-56" />
            {/* Large half circle - top right */}
            <div className="absolute -top-20 -right-20 h-40 w-40 rounded-full border border-white/10 md:h-56 md:w-56" />
            {/* Half circle - bottom left */}
            <div className="absolute -bottom-16 -left-16 h-32 w-32 rounded-full border border-white/5 md:h-44 md:w-44" />

            {/* Small circles - scattered (dot pattern) */}
            {[
              { x: "10%", y: "20%", size: 3 },
              { x: "85%", y: "25%", size: 4 },
              { x: "15%", y: "75%", size: 2 },
              { x: "90%", y: "70%", size: 3 },
              { x: "50%", y: "15%", size: 2 },
              { x: "25%", y: "50%", size: 2 },
              { x: "75%", y: "55%", size: 3 },
              { x: "5%", y: "45%", size: 2 },
              { x: "95%", y: "40%", size: 2 },
              { x: "45%", y: "85%", size: 3 },
            ].map((dot, i) => (
              <div
                key={i}
                className="absolute rounded-full bg-white/10"
                style={{
                  left: dot.x,
                  top: dot.y,
                  width: dot.size * 4,
                  height: dot.size * 4,
                  transform: "translate(-50%, -50%)",
                }}
              />
            ))}

            {/* Gradient overlay - soft */}
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/40 via-transparent to-purple-600/30" />
          </div>

          {/* Content */}
          <div className="relative z-10">
            <div className="mb-12 text-center md:mb-16">
              <h2 className="font-nacelle text-3xl font-bold text-white md:text-4xl lg:text-5xl">
                The Numbers Speak for Themselves
              </h2>
              <p className="mt-3 text-sm font-medium uppercase tracking-wider text-white/80 md:text-base">
                Real results from our partner retailers
              </p>
            </div>

            <div className="grid gap-8 sm:grid-cols-3 md:gap-12">
              {STATS.map((stat, i) => (
                <div
                  key={stat.label}
                  className={`stats-item-enter stats-item-delay-${i} text-center`}
                >
                  <p className="font-nacelle text-4xl font-bold text-white transition-transform duration-300 group-hover:scale-105 md:text-5xl lg:text-6xl">
                    {stat.value}
                  </p>
                  <p className="mt-2 text-xs font-medium uppercase tracking-wider text-white/80 md:text-sm">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
