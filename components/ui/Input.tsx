import { cn } from '@/lib/utils'
import { cva, type VariantProps } from "class-variance-authority";
import React from 'react'

const inputVariants = cva(
    "min-w-[200px] min-h-[40px] px-4 py-2 rounded-[10px] placeholder:text-(--coolgray-60)",
    {
        variants: {
            variant: {
                default: "border border-",
                outline: "border border-(overlay-50) title",
            }
        },
        defaultVariants: {
            variant: "default",
        }
    }
)

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, variant, value, onChange, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cn(inputVariants({ variant }), className)}
        value={value}
        onChange={onChange}
        {...props}
      />
    );
  }
);

export default Input