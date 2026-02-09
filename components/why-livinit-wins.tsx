type Cell = { text: string; check: boolean; neutral?: boolean };

const COMPARISON: {
  capability: string;
  livinit: Cell;
  aiViz: Cell;
  designServices: Cell;
  retailerAr: Cell;
}[] = [
  {
    capability: "DESIGN WORKFLOW",
    livinit: { text: "Instant Auto-Layout", check: true },
    aiViz: { text: "Manual Drag & Drop", check: false },
    designServices: { text: "Human Consultation", check: false, neutral: true },
    retailerAr: { text: "Single-Item AR", check: false },
  },
  {
    capability: "FURNITURE CATALOG",
    livinit: { text: "Multi-Brand Real SKUs", check: true },
    aiViz: { text: "Generic 3D Models", check: false },
    designServices: { text: "Manual Selection", check: false, neutral: true },
    retailerAr: { text: "Single Store Only", check: false },
  },
  {
    capability: "TIME TO DESIGN",
    livinit: { text: "Seconds", check: true },
    aiViz: { text: "Seconds", check: true },
    designServices: { text: "3-7 Business Days", check: false, neutral: true },
    retailerAr: { text: "Seconds", check: true },
  },
  {
    capability: "SPATIAL ACCURACY",
    livinit: { text: "To-Scale Engineering", check: true },
    aiViz: { text: "Visual Placement", check: false, neutral: true },
    designServices: { text: "Pro Floorplans", check: true },
    retailerAr: { text: "AR Visualization", check: false, neutral: true },
  },
  {
    capability: "PURCHASE PATH",
    livinit: { text: "Scan-to-Checkout", check: true },
    aiViz: { text: "Broken Links / None", check: false },
    designServices: { text: "Manual Shopping List", check: false, neutral: true },
    retailerAr: { text: "Direct Buy (1 Store)", check: true },
  },
  {
    capability: "BUDGET CONSTRAINTS",
    livinit: { text: "Strict Adherence", check: true },
    aiViz: { text: "N/A", check: false },
    designServices: { text: "Varies (Human)", check: false, neutral: true },
    retailerAr: { text: "N/A (Single Product $)", check: false },
  },
  {
    capability: "LIVABILITY RULES",
    livinit: { text: "Automated (Collision free)", check: true },
    aiViz: { text: "N/A (Static)", check: false },
    designServices: { text: "Expert Dependent", check: false, neutral: true },
    retailerAr: { text: "N/A (Static)", check: false },
  },
];

function CellIcon({ win, neutral }: { win: boolean; neutral?: boolean }) {
  if (win) {
    return (
      <span className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-indigo-500/20 text-indigo-400">
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
      <span className="inline-flex h-5 w-5 shrink-0 items-center justify-center text-lg font-bold text-gray-400">
        ~
      </span>
    );
  }
  return (
    <span className="inline-flex h-5 w-5 shrink-0 items-center justify-center text-red-400/90">
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
        <div className="mb-10 text-center md:mb-12">
          <h2 className="mb-4 font-nacelle text-3xl font-semibold text-white md:text-4xl">
            Why{" "}
            <span className="bg-linear-to-r from-indigo-400 via-purple-400 to-indigo-500 bg-clip-text text-transparent">
              LIVINIT Wins.
            </span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-300">
            LIVINIT occupies the &apos;Sweet Spot&apos;: Speed + Retail
            Reality.
          </p>
        </div>

        <div className="overflow-hidden rounded-2xl border border-gray-700/50 bg-gray-800/30 backdrop-blur-sm">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] border-collapse text-left">
              <thead>
                <tr className="border-b border-gray-700/50">
                  <th className="bg-gray-800/50 px-4 py-4 text-xs font-semibold uppercase tracking-wider text-gray-400 md:px-6">
                    Strategic Edge
                  </th>
                  <th className="bg-indigo-500/10 px-4 py-4 text-xs font-semibold uppercase tracking-wider text-indigo-400 md:px-6">
                    LIVINIT
                  </th>
                  <th className="bg-gray-800/50 whitespace-nowrap px-4 py-4 md:px-6">
                    <span className="text-xs font-semibold uppercase tracking-wider text-gray-300">
                      AI Visualization Apps
                    </span>
                  </th>
                  <th className="bg-gray-800/50 px-4 py-4 md:px-6">
                    <span className="block text-xs font-semibold uppercase tracking-wider text-gray-300">
                      Design Services
                    </span>
                  </th>
                  <th className="bg-gray-800/50 px-4 py-4 md:px-6">
                    <span className="block text-xs font-semibold uppercase tracking-wider text-gray-300">
                      Retailer AR / Inspo
                    </span>
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
                    <td className="bg-gray-800/30 px-4 py-4 text-xs font-semibold uppercase tracking-wider text-gray-400 md:px-6">
                      {row.capability}
                    </td>
                    <td className="bg-gray-800/20 px-4 py-4 md:px-6">
                      <span className="flex items-center gap-2 text-sm text-white">
                        <CellIcon win={row.livinit.check} />
                        {row.livinit.text}
                      </span>
                    </td>
                    <td className="px-4 py-4 md:px-6">
                      <span className="flex items-center gap-2 text-sm text-gray-400">
                        <CellIcon
                          win={row.aiViz.check}
                          neutral={row.aiViz.neutral}
                        />
                        {row.aiViz.text}
                      </span>
                    </td>
                    <td className="px-4 py-4 md:px-6">
                      <span className="flex items-center gap-2 text-sm text-gray-400">
                        <CellIcon
                          win={row.designServices.check}
                          neutral={row.designServices.neutral}
                        />
                        {row.designServices.text}
                      </span>
                    </td>
                    <td className="px-4 py-4 md:px-6">
                      <span className="flex items-center gap-2 text-sm text-gray-400">
                        <CellIcon
                          win={row.retailerAr.check}
                          neutral={row.retailerAr.neutral}
                        />
                        {row.retailerAr.text}
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
