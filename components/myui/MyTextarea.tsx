import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import React from "react";

const textareaVariants = cva(
  "w-full min-w-[200px] min-h-[80px] px-4 py-2 rounded-[10px] text-[--coolgray-60] placeholder:text-[--coolgray-60] resize-y",
  {
    variants: {
      variant: {
        default: "border",
        outline: "border border-[--overlay-50] title",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    VariantProps<typeof textareaVariants> {
  error?: string;
  rightIcon?: React.ReactNode;
  leftIcon?: React.ReactNode;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      className,
      variant,
      error,
      value,
      onChange,
      rightIcon,
      leftIcon,
      ...props
    },
    ref
  ) => {
    const hasError = !!error;

    return (
      <div className="w-full">
        <div className="relative">
          <textarea
            ref={ref}
            value={value}
            onChange={onChange}
            autoComplete="off"
            className={cn(
              textareaVariants({ variant }),
              rightIcon && "pr-10",
              leftIcon && "pl-10",
              hasError && "border-[--error] placeholder:text-[--error]",
              className
            )}
            {...props}
          />
          {rightIcon && (
            <span className="absolute right-3 top-3 cursor-pointer select-none">
              {rightIcon}
            </span>
          )}
          {leftIcon && (
            <span className="absolute left-3 top-3 cursor-pointer select-none">
              {leftIcon}
            </span>
          )}
        </div>
        {hasError && <p className="text-[--error] text-xs mt-1">{error}</p>}
      </div>
    );
  }
);
Textarea.displayName = "Textarea";

export default Textarea;
