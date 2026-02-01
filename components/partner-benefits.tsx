const BENEFITS = [
  {
    title: "List for Free",
    description:
      "Add your entire catalog to Livinit at zero cost. We integrate with your existing product feed.",
    icon: "cube",
    color: "blue",
  },
  {
    title: "Convert 2D Catalog to 3D",
    description:
      "Our AI automatically converts your product images into 3D models that customers can place in their virtual rooms.",
    icon: "2d3d",
    color: "purple",
  },
  {
    title: "Reduce Returns",
    description:
      "Customers see exactly how your furniture fits in their space before buying, reducing return rates by up to 40%.",
    icon: "chart-down",
    color: "red",
  },
  {
    title: "Increase AOV",
    description:
      "Our AI suggests complementary products, increasing average order value and cross-sell opportunities.",
    icon: "chart-up",
    color: "orange",
  },
];

const colorClasses = {
  blue: "bg-blue-500/20 text-blue-400",
  purple: "bg-purple-500/20 text-purple-400",
  red: "bg-red-500/20 text-red-400",
  orange: "bg-orange-500/20 text-orange-400",
} as const;

function BenefitIcon({
  icon,
  color,
}: {
  icon: string;
  color: keyof typeof colorClasses;
}) {
  const base = "flex h-12 w-12 items-center justify-center rounded-xl md:h-14 md:w-14";
  const colorClass = colorClasses[color];

  if (icon === "cube") {
    return (
      <div className={`${base} ${colorClass}`}>
        <svg className="h-6 w-6 md:h-7 md:w-7" fill="currentColor" viewBox="0 0 24 24">
          <path d="M21 16.5c0 .38-.21.71-.53.88l-7.9 4.44c-.16.12-.36.18-.57.18-.21 0-.41-.06-.57-.18l-7.9-4.44A.99.99 0 0 1 3 16.5v-9c0-.38.21-.71.53-.88l7.9-4.44c.16-.12.36-.18.57-.18.21 0 .41.06.57.18l7.9 4.44c.32.17.53.5.53.88v9zM12 4.81L5.47 8.5 12 12.19l6.53-3.69L12 4.81zM5 9.5l6 3.38v7.81l6-3.38v-7.8L11 6.69 5 9.5z" />
        </svg>
      </div>
    );
  }
  if (icon === "2d3d") {
    return (
      <div className={`${base} ${colorClass}`}>
        <svg className="h-6 w-6 md:h-7 md:w-7" fill="currentColor" viewBox="0 0 24 24">
          <path d="M3 5v14h8V5H3zm2 2h4v4H5V7zm0 6h4v4H5v-4zm6-8h8v4h-8V5zm0 6h8v2h-8v-2zm0 4h8v2h-8v-2z" />
        </svg>
      </div>
    );
  }
  if (icon === "chart-down") {
    return (
      <div className={`${base} ${colorClass}`}>
        <svg className="h-6 w-6 md:h-7 md:w-7" fill="currentColor" viewBox="0 0 24 24">
          <path d="M3.5 18.49l6-6.01 4 4L22 6.92l-1.41-1.41-7.09 7.97-4-4L2 16.99z" />
        </svg>
      </div>
    );
  }
  if (icon === "chart-up") {
    return (
      <div className={`${base} ${colorClass}`}>
        <svg className="h-6 w-6 md:h-7 md:w-7" fill="currentColor" viewBox="0 0 24 24">
          <path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6h-6z" />
        </svg>
      </div>
    );
  }
  return null;
}

export default function PartnerBenefits() {
  return (
    <section className="relative overflow-hidden py-12 md:py-16">
      {/* Soft top edge – no hard cut; gradient blends with section above */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-24 bg-gradient-to-b from-gray-950 to-transparent"
        aria-hidden
      />

      {/* Background shapes – floating orbs + gradient */}
      <div
        className="section-bg-float pointer-events-none absolute -right-1/4 top-1/4 -z-10 h-[55vmin] w-[55vmin] rounded-full bg-indigo-500/25 blur-[60px]"
        aria-hidden
      />
      <div
        className="section-bg-float-slow pointer-events-none absolute -left-1/4 bottom-1/4 -z-10 h-[50vmin] w-[50vmin] rounded-full bg-purple-500/25 blur-[60px]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-indigo-950/15 to-transparent"
        aria-hidden
      />
      <div
        className="section-bg-grid-integration pointer-events-none absolute inset-0 -z-10 opacity-40"
        aria-hidden
      />

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6">
        {/* Section header - same style as home page */}
        <div className="mb-10 text-center md:mb-12">
          <div className="mb-4 flex items-center justify-center gap-2">
            <div className="h-2 w-2 rounded-full bg-indigo-500" />
            <span className="text-sm font-medium uppercase tracking-wider text-gray-400">
              Why Partner
            </span>
          </div>
          <h2 className="mb-6 font-nacelle text-4xl font-semibold text-white md:text-5xl">
            Grow Your{" "}
            <span className="bg-linear-to-r from-indigo-400 via-purple-400 to-indigo-500 bg-clip-text text-transparent">
              Retail.
            </span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-300">
            Join the platform that turns your catalog into an AI-powered
            shopping experience. List free, convert to 3D, and sell more.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:gap-8">
          {BENEFITS.map((item) => (
            <article
              key={item.title}
              className="rounded-2xl border border-gray-700/50 bg-gray-800/40 p-6 transition-all hover:border-gray-600/50 hover:bg-gray-800/60 md:p-8"
            >
              <BenefitIcon icon={item.icon} color={item.color as keyof typeof colorClasses} />
              <h3 className="mt-4 font-nacelle text-xl font-semibold text-white md:text-2xl">
                {item.title}
              </h3>
              <p className="mt-3 text-gray-300 leading-relaxed">
                {item.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
