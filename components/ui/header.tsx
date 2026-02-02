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

          {/* Partner button */}
          <div className="flex flex-1 items-center justify-end">
            <Link
              href="/partner"
              className="btn-sm rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 px-4 py-2.5 font-medium uppercase tracking-wide text-white shadow-md transition-all hover:from-indigo-500 hover:to-purple-500 hover:shadow-lg"
              aria-label="Partner"
            >
              Partner
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
