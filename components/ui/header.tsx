"use client";

import Link from "next/link";
import Logo from "./logo";

export default function Header() {
  return (
    <header className="z-30 mt-2 w-full md:mt-5">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="relative flex h-14 items-center justify-between gap-3 rounded-2xl bg-gray-900 px-4 shadow-lg">
          {/* Logo */}
          <div className="flex flex-1 items-center">
            <Logo />
          </div>

          {/* Nav: pill buttons, subtle fill + border */}
          <nav className="flex flex-1 items-center justify-end gap-2 sm:gap-3">
            <Link
              href="/templates"
              className="rounded-full border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-medium text-white transition-all hover:border-white/20 hover:bg-white/10"
              aria-label="Explore templates"
            >
              Explore templates
            </Link>
            <Link
              href="/partner"
              className="rounded-full border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-medium text-white transition-all hover:border-white/20 hover:bg-white/10"
              aria-label="Partner"
            >
              Partner
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
