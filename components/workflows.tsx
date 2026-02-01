import { HiSparkles } from "react-icons/hi2";
import { FaDollarSign, FaCalculator, FaBolt } from "react-icons/fa";

export default function Workflows() {
  return (
    <section className="relative pt-8 pb-12 md:pt-10 md:pb-16 overflow-hidden">
      {/* Subtle background icon decoration - uses existing page background */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <HiSparkles className="h-[480px] w-[480px] text-indigo-500/5 md:h-[640px] md:w-[640px]" aria-hidden />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6">
        {/* Section header */}
        <div className="mb-10 md:mb-12 text-center">
          <div className="mb-4 flex items-center justify-center gap-2">
            <div className="h-2 w-2 rounded-full bg-indigo-500"></div>
            <span className="text-sm font-medium uppercase tracking-wider text-gray-400">
              CORE CAPABILITIES
            </span>
          </div>
          <h2 className="mb-6 font-nacelle text-4xl font-semibold text-white md:text-5xl">
            Our Design{" "}
            <span className="bg-linear-to-r from-indigo-400 via-purple-400 to-indigo-500 bg-clip-text text-transparent">
              Superpowers.
            </span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-300">
            AI-powered interior design that respects the laws of physics and the
            reality of retail.
          </p>
        </div>

        {/* Feature cards - simple */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              icon: HiSparkles,
              title: "Design with a Prompt",
              desc: "Type your vibe and watch AI create fully furnished rooms with real products",
            },
            {
              icon: FaDollarSign,
              title: "Budget Control",
              desc: "Set your budget and we'll design with real products within your range",
            },
            {
              icon: FaCalculator,
              title: "Room Measurements",
              desc: "Upload a photo or floor plan and we'll respect your actual space",
            },
            {
              icon: FaBolt,
              title: "Instant Shopping",
              desc: "Every item is shoppable from Wayfair, Crate & Barrel, and more",
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="group rounded-2xl border border-gray-700/50 bg-gray-800/40 p-6 text-center backdrop-blur-sm transition-all duration-300 hover:border-gray-600/60 hover:bg-gray-800/60"
            >
              <div className="mb-4 flex justify-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-black">
                  <item.icon className="h-6 w-6" />
                </div>
              </div>
              <h3 className="mb-2 text-lg font-semibold text-white">
                {item.title}
              </h3>
              <p className="text-sm leading-relaxed text-gray-300">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
