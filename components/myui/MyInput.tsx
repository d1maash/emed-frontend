import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import React from "react";

const inputVariants = cva(
  "w-full min-w-[200px] min-h-[40px] px-4 py-2 rounded-[10px] text-[--coolgray-60] placeholder:text-[--coolgray-60]",
  {
    variants: {
      variant: {
        default: "border ",
        outline: "border border-[--overlay-50] title",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {
  error?: string;
  rightIcon?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    { className, variant, error, type, value, onChange, rightIcon, ...props },
    ref
  ) => {
    const hasError = !!error;

    return (
      <div className="w-full">
        <div className="relative">
          <input
            ref={ref}
            type={type}
            value={value}
            onChange={onChange}
            autoComplete="off"
            className={cn(
              inputVariants({ variant }),
              rightIcon && "pr-10",
              hasError && "border-[--error] placeholder:text-[--error]",
              className
            )}
            {...props}
          />
          {rightIcon && (
            <span className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer select-none">
              {rightIcon}
            </span>
          )}
        </div>
        {hasError && <p className="text-[--error] text-xs mt-1">{error}</p>}
      </div>
    );
  }
);
Input.displayName = "Input";

export default Input;
