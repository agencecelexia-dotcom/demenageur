import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "link";
  size?: "sm" | "md" | "lg" | "icon";
  href?: string;
  asChild?: boolean;
}

const variantStyles: Record<string, string> = {
  primary: "bg-accent-500 text-white hover:bg-accent-600 focus-visible:ring-accent-500",
  secondary: "bg-primary-800 text-white hover:bg-primary-900 focus-visible:ring-primary-800",
  outline: "border-2 border-primary-800 text-primary-800 hover:bg-primary-50 focus-visible:ring-primary-800",
  ghost: "text-primary-800 hover:bg-primary-50 focus-visible:ring-primary-800",
  link: "text-primary-700 underline-offset-4 hover:underline focus-visible:ring-primary-700",
};

const sizeStyles: Record<string, string> = {
  sm: "h-9 px-4 text-sm rounded-md",
  md: "h-11 px-6 text-sm rounded-lg",
  lg: "h-13 px-8 text-base rounded-lg",
  icon: "h-10 w-10 rounded-lg",
};

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", href, children, ...props }, ref) => {
    const baseClass = cn(
      "inline-flex items-center justify-center font-semibold transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed",
      variantStyles[variant],
      sizeStyles[size],
      className
    );

    if (href) {
      return (
        <Link href={href} className={baseClass}>
          {children}
        </Link>
      );
    }

    return (
      <button ref={ref} className={baseClass} {...props}>
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";

export { Button };
export default Button;
