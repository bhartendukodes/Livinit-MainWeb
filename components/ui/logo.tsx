import Link from "next/link";
import Image from "next/image";

export default function Logo() {
  return (
    <Link
      href="/"
      className="inline-flex shrink-0 items-center gap-2"
      aria-label="Livinit"
    >
      <Image
        src="/images/logo.png"
        alt="Livinit"
        width={32}
        height={32}
        className="h-8 w-8 shrink-0 object-contain"
        unoptimized
      />
      <span className="min-w-0 shrink-0 font-semibold uppercase tracking-tight text-white">
        LIVINIT
      </span>
    </Link>
  );
}
