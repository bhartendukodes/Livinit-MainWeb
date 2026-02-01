import Image from "next/image";

const COMPARISON = [
  {
    capability: "Turnaround Time",
    livinit: { text: "Seconds", check: true },
    interiorAi: { text: "Seconds", check: false },
    havenly: { text: "~ 3-7 Days", check: false },
  },
  {
    capability: "Shoppable Products",
    livinit: { text: "Real (1-Click Buy)", check: true },
    interiorAi: { text: "Fake (Hallucinated)", check: false },
    havenly: { text: "~ Manual List", check: false },
  },
  {
    capability: "Spatial Awareness",
    livinit: { text: "Exact Scale", check: true },
    interiorAi: { text: "Distorted Rooms", check: false },
    havenly: { text: "~ Human Designer", check: false },
  },
  {
    capability: "Cost Per Room",
    livinit: { text: "Affordable App", check: true },
    interiorAi: { text: "Free / Sub", check: false },
    havenly: { text: "~ High ($199+)", check: false },
  },
  {
    capability: "Budget Constraints",
    livinit: { text: "Strict Adherence", check: true },
    interiorAi: { text: "None", check: false },
    havenly: { text: "Varies", check: false, neutral: true },
  },
];

function CheckIcon({
  win,
  neutral,
}: {
  win: boolean;
  neutral?: boolean;
}) {
  if (win) {
    return (
      <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-indigo-500/20 text-indigo-400">
        <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
            clipRule="evenodd"
          />
        </svg>
      </span>
    );
  }
  if (neutral) {
    return (
      <span className="inline-flex h-5 w-5 items-center justify-center text-gray-400">
        <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
            clipRule="evenodd"
          />
        </svg>
      </span>
    );
  }
  return (
    <span className="inline-flex h-5 w-5 items-center justify-center text-gray-500">
      <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
        <path
          fillRule="evenodd"
          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
          clipRule="evenodd"
        />
      </svg>
    </span>
  );
}

export default function WhyLivinitWins() {
  return (
    <section className="relative overflow-hidden border-t border-gray-800 py-12 md:py-16">
      {/* Animated background - 4th section */}
      <div
        className="section-bg-float pointer-events-none absolute -left-1/4 top-1/3 -z-10 h-[80vmin] w-[80vmin] rounded-full bg-indigo-500/20 blur-[90px]"
        aria-hidden
      />
      <div
        className="section-bg-float-slow pointer-events-none absolute -right-1/4 top-1/2 -z-10 h-[65vmin] w-[65vmin] rounded-full bg-purple-500/20 blur-[80px]"
        aria-hidden
      />
      <div
        className="section-bg-pulse pointer-events-none absolute bottom-1/4 left-1/2 -z-10 h-[45vmin] w-[45vmin] -translate-x-1/2 rounded-full bg-indigo-400/15 blur-[60px]"
        aria-hidden
      />
      <div
        className="section-bg-grid pointer-events-none absolute inset-0 -z-10 opacity-50"
        aria-hidden
      />

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6">
        {/* Section header - centered */}
        <div className="mb-10 text-center md:mb-12">
          <h2 className="mb-4 font-nacelle text-3xl font-semibold text-white md:text-4xl">
            Why{" "}
            <span className="bg-linear-to-r from-indigo-400 via-purple-400 to-indigo-500 bg-clip-text text-transparent">
              Livinit Wins.
            </span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-300">
            Livinit occupies the &apos;Sweet Spot&apos;: AI Speed + Retail
            Reality.
          </p>
        </div>

        {/* Comparison table card */}
        <div className="overflow-hidden rounded-2xl border border-gray-700/50 bg-gray-800/30 backdrop-blur-sm">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] border-collapse text-left">
              <thead>
                <tr className="border-b border-gray-700/50">
                  <th className="bg-gray-800/50 px-4 py-4 text-xs font-semibold uppercase tracking-wider text-gray-400 md:px-6">
                    Capability
                  </th>
                  <th className="bg-indigo-500/10 px-4 py-4 text-xs font-semibold uppercase tracking-wider text-indigo-400 md:px-6">
                    <span className="inline-flex items-center gap-2">
                      <Image
                        src="/images/logo.png"
                        alt="Livinit"
                        width={20}
                        height={20}
                        className="rounded"
                      />
                      Livinit
                    </span>
                  </th>
                  <th className="bg-gray-800/50 px-4 py-4 text-xs font-semibold uppercase tracking-wider text-gray-400 md:px-6">
                    Interior AI / RoomGPT
                  </th>
                  <th className="bg-gray-800/50 px-4 py-4 text-xs font-semibold uppercase tracking-wider text-gray-400 md:px-6">
                    Havenly / Decorilla
                  </th>
                </tr>
              </thead>
              <tbody>
                {COMPARISON.map((row, i) => (
                  <tr
                    key={row.capability}
                    className={
                      i < COMPARISON.length - 1
                        ? "border-b border-gray-700/30"
                        : ""
                    }
                  >
                    <td className="px-4 py-4 font-medium text-gray-300 md:px-6">
                      {row.capability}
                    </td>
                    <td className="bg-gray-800/20 px-4 py-4 md:px-6">
                      <span className="flex items-center gap-2 text-sm text-white">
                        <CheckIcon win={row.livinit.check} />
                        {row.livinit.text}
                      </span>
                    </td>
                    <td className="px-4 py-4 md:px-6">
                      <span className="flex items-center gap-2 text-sm text-gray-400">
                        <CheckIcon win={false} />
                        {row.interiorAi.text}
                      </span>
                    </td>
                    <td className="px-4 py-4 md:px-6">
                      <span className="flex items-center gap-2 text-sm text-gray-400">
                        <CheckIcon
                          win={false}
                          neutral={"neutral" in row.havenly && row.havenly.neutral}
                        />
                        {row.havenly.text}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
