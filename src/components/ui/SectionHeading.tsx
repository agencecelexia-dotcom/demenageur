import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
  light?: boolean;
  className?: string;
}

export function SectionHeading({
  title,
  subtitle,
  centered = true,
  light = false,
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn(centered && "text-center", className)}>
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
        {title}
      </h2>
      <div className="h-1 w-16 bg-accent-500 mx-auto mb-4 rounded" />
      {subtitle && (
        <p
          className={cn(
            "text-lg max-w-2xl mx-auto",
            light ? "text-white/70" : "text-neutral-600"
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
