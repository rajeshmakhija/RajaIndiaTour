import Image from "next/image";
import Link from "next/link";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link href="/" className={`inline-flex items-center ${className}`}>
      <Image
        src="/images/logo.png"
        alt="RajaIndiaTour — voyages sur mesure en Inde"
        width={220}
        height={60}
        className="h-10 w-auto md:h-12"
        priority
        unoptimized
      />
    </Link>
  );
}
