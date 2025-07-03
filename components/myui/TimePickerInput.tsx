import * as React from "react";
import MyInput from "./MyInput";
import { cn } from "@/lib/utils";

interface TimePickerInputProps {
  value: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onChange: (value: string) => void;
  disabled?: boolean;
  className?: string;
}

export const TimePickerInput: React.FC<TimePickerInputProps> = ({
  value,
  onChange,
  disabled,
  rightIcon,
  leftIcon,
  className = "",
}) => {
  return (
    <MyInput
      type="time"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      disabled={disabled}
      className={cn("w-min", className)}
      rightIcon={rightIcon}
      leftIcon={leftIcon}
    />
  );
};
