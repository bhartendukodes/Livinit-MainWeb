export const metadata = {
  title: "Home - Open PRO",
  description: "Page description",
};

import PageIllustration from "@/components/page-illustration";
import Hero from "@/components/hero-home";
import Workflows from "@/components/workflows";
import Features from "@/components/features";
import WhyLivinitWins from "@/components/why-livinit-wins";
import MadeWithLivinitClient from "@/components/made-with-livinit-client";
import Cta from "@/components/cta";
import AppDownloadCta from "@/components/app-download-cta";

export default function Home() {
  return (
    <>
      <PageIllustration />
      <Hero />
      <Workflows />
      <Features />
      <WhyLivinitWins />
      <MadeWithLivinitClient />
      <Cta />
      <AppDownloadCta />
    </>
  );
}
