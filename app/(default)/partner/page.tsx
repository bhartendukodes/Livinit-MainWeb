import PageIllustration from "@/components/page-illustration";
import PartnerHero from "@/components/partner-hero";
import PartnerStatsCard from "@/components/partner-stats-card";
import Partner3DEcosystem from "@/components/partner-3d-ecosystem";
import PartnerIntegration from "@/components/partner-integration";
import PartnerCta from "@/components/partner-cta";

export const metadata = {
  title: "Partner with LIVINIT",
  description:
    "Transform your furniture catalog into an AI-powered shopping experience. Join leading retailers on our platform.",
};

export default function PartnerPage() {
  return (
    <>
      <PageIllustration />
      <PartnerHero />
      <Partner3DEcosystem />
      <PartnerStatsCard />
      <PartnerIntegration />
      <PartnerCta />
    </>
  );
}
