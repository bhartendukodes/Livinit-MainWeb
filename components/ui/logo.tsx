import Link from "next/link";
import Image from "next/image";

export default function Logo() {
  return (
    <Link
      href="/"
      className="inline-flex shrink-0 items-center"
      aria-label="LIVINIT"
    >
      <Image
        src="/images/logo.png"
        alt="LIVINIT"
        width={56}
        height={56}
        className="h-14 w-14 shrink-0 object-contain"
        unoptimized
      />
    </Link>
  );
}
