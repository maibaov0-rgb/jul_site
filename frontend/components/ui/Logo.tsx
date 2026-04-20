import Image from "next/image";
import Link from "next/link";

export function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" className={`block ${className ?? ""}`.trim()} aria-label="На Голову — перейти на головну">
      <Image
        src="/logo.svg"
        alt="Na Gólov[y]"
        width={160}
        height={44}
        priority
        style={{ mixBlendMode: "multiply" }}
        className="h-9 w-auto object-contain"
      />
    </Link>
  );
}
