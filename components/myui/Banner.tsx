// src/components/ui/banner.tsx
import * as React from "react";
import { cn } from "@/lib/utils";

export type BannerVariant = "success" | "warning" | "error";

export interface BannerProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: BannerVariant;
}

const variantStyles: Record<
  BannerVariant,
  { bg: string; border: string; text: string; icon: React.ReactNode }
> = {
  success: {
    bg: "bg-[rgba(var(--success-rgb),0.1)]",
    border: "border-l-4 border-[--success]",
    text: "text-[--success]",
    icon: (
      <svg
        className="w-5 h-5 mr-2"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
      </svg>
    ),
  },
  warning: {
    bg: "bg-[rgba(var(--warning-rgb),0.1)]",
    border: "border-l-4 border-[--warning]",
    text: "text-[--warning]",
    icon: (
      <svg
        className="w-5 h-5 mr-2"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
  },
  error: {
    bg: "bg-[rgba(var(--error-rgb),0.1)]",
    border: "border-l-4 border-[--error]",
    text: "text-[--error]",
    icon: (
      <svg
        className="w-5 h-5 mr-2"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    ),
  },
};

const Banner = React.forwardRef<HTMLDivElement, BannerProps>(
  ({ className, variant = "warning", children, ...props }, ref) => {
    const styles = variantStyles[variant];
    return (
      <div
        ref={ref}
        role={variant === "error" ? "alert" : "status"}
        className={cn(
          "flex items-start gap-2 p-4 text-sm rounded-xl",
          styles.bg,
          styles.border,
          className
        )}
        {...props}
      >
        <span className={cn(styles.text)}>{styles.icon}</span>
        <div className="flex-1">{children}</div>
      </div>
    );
  }
);
Banner.displayName = "Banner";

export { Banner };
