"use client";

import dynamic from "next/dynamic";

const MadeWithLivinit = dynamic(
  () => import("@/components/made-with-livinit"),
  { ssr: false }
);

export default function MadeWithLivinitClient() {
  return <MadeWithLivinit />;
}
