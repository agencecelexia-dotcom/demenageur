import * as React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "secondary" | "outline" | "ghost";
}

const variantStyles: Record<string, string> = {
  default: "bg-accent-500 text-white",
  secondary: "bg-primary-100 text-primary-800",
  outline: "border border-neutral-300 text-neutral-700",
  ghost: "bg-neutral-100 text-neutral-700",
};

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant = "default", ...props }, ref) => (
    <div
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold",
        variantStyles[variant],
        className
      )}
      ref={ref}
      {...props}
    />
  )
);
Badge.displayName = "Badge";

export { Badge };
export default Badge;
