import { cn } from '@/lib/utils'
import { cva, type VariantProps } from "class-variance-authority";
import React from 'react'

const inputVariants = cva(
    "min-w-[200px] min-h-[40px] px-4 py-2 rounded-[10px] text-[--coolgray-60] placeholder:text-[--coolgray-60]",
    {
        variants: {
            variant: {
                default: "border ",
                outline: "border border-[--overlay-50] title",
            }
        },
        defaultVariants: {
            variant: "default",
        }
    }
)

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {
      error?: string;
    }

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, variant, error, value, onChange, ...props }, ref) => {
    const hasError = !!error && (!value || value === "")

    return (
      <div className='w-full'>
      <input
        ref={ref}
        className={
          cn(
            inputVariants({ variant }),
            hasError && 'border-[--error] placeholder:text-[--error]', 
            className)
        }
        {...props}
        />
        {hasError && (
          <p className='text-[--error] body-xs'>{error}</p>
        )}
      </div>
    );
  }
);

export default Input