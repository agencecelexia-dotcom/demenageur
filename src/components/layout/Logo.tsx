import Link from "next/link";
import { cn } from "@/lib/utils";
import { clientConfig } from "@/config/client.config";

interface LogoProps {
  light?: boolean;
  className?: string;
}

export default function Logo({ light = false, className }: LogoProps) {
  const nameParts = clientConfig.NOM_ENTREPRISE.split(" ");
  const firstWord = nameParts[0];
  const rest = nameParts.slice(1).join(" ");

  return (
    <Link href="/" className={cn("flex items-center gap-2 group", className)}>
      {/* Truck icon */}
      <svg
        width="38"
        height="38"
        viewBox="0 0 38 38"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="transition-transform duration-300 group-hover:scale-105 shrink-0"
      >
        <rect width="38" height="38" rx="8" fill={light ? "rgba(255,255,255,0.15)" : "oklch(35% 0.12 255)"} />
        {/* Truck body */}
        <rect x="5" y="14" width="20" height="12" rx="2"
          fill={light ? "oklch(72% 0.18 65)" : "oklch(72% 0.18 65)"} />
        {/* Truck cab */}
        <path d="M25 18H31C32.1 18 33 18.9 33 20V24C33 25.1 32.1 26 31 26H25V18Z"
          fill={light ? "white" : "oklch(93% 0.03 255)"} />
        {/* Windshield */}
        <rect x="26" y="19" width="5" height="4" rx="1"
          fill={light ? "oklch(48% 0.13 255)" : "oklch(48% 0.13 255)"} />
        {/* Wheels */}
        <circle cx="10" cy="27" r="3"
          fill={light ? "white" : "oklch(26% 0.008 255)"} />
        <circle cx="22" cy="27" r="3"
          fill={light ? "white" : "oklch(26% 0.008 255)"} />
        <circle cx="30" cy="27" r="3"
          fill={light ? "white" : "oklch(26% 0.008 255)"} />
        {/* Wheel hubs */}
        <circle cx="10" cy="27" r="1.2"
          fill={light ? "oklch(72% 0.18 65)" : "oklch(72% 0.18 65)"} />
        <circle cx="22" cy="27" r="1.2"
          fill={light ? "oklch(72% 0.18 65)" : "oklch(72% 0.18 65)"} />
        <circle cx="30" cy="27" r="1.2"
          fill={light ? "oklch(72% 0.18 65)" : "oklch(72% 0.18 65)"} />
      </svg>
      <div className="flex flex-col leading-tight">
        <span
          className={cn(
            "font-heading text-xl font-bold tracking-tight",
            light ? "text-white" : "text-primary-900"
          )}
        >
          {firstWord}
        </span>
        <span
          className={cn(
            "text-xs font-bold uppercase tracking-[0.18em]",
            light ? "text-accent-300" : "text-accent-600"
          )}
        >
          {rest}
        </span>
      </div>
    </Link>
  );
}
