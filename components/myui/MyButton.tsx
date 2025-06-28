import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

const buttonVariants = cva(
  "rounded-[10px] inline-flex items-center justify-center font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
  {
    variants: {
      variant: {
        filled: "bg-[--primary-60] text-white hover:bg-[--primary-90]",
        outline:
          "border border-(--primary-60) text-(--primary-60) hover:bg-(--primary-30)",
        danger: "bg-[--error] text-white hover:bg-[color:(var(--error)]/70",
        disabled: "bg-[--coolgray/30] text-white cursor-not-allowed",
        link: "text-[--primary-60] hover:text-(--primary-90)",
      },
      size: {
        small: "button-s px-[28px] py-[11px]",
        medium: "button-m px-[28px] py-[15px]",
        large: "button-l px-8 py-[19px]",
      },
    },
    defaultVariants: {
      variant: "filled",
      size: "medium",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const MyButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant, size }), className)}
        {...props}
      />
    );
  }
);

export default MyButton;
