"use client";

import { Check } from "lucide-react";
import React from "react";

interface StepperProps {
  stepsCount: number;
  currentStep: number;
}

const Stepper: React.FC<StepperProps> = ({ stepsCount, currentStep }) => {
  const steps = Array.from({ length: stepsCount }, (_, i) => `${i + 1} этап`);
  return (
    <div className="hidden sm:flex mt-5 w-full justify-between relative">
      {steps.map((label, idx) => {
        const stepNumber = idx + 1;
        const isCompleted = stepNumber < currentStep;
        return (
          <div
            key={label}
            className="flex-1 flex flex-col items-center relative min-w-[60px]"
          >
            {idx !== 0 && (
              <div
                className={`absolute top-1/3 left-0 -translate-y-1/2 -translate-x-1/2 z-0 w-full h-3 rounded-full transition-colors duration-300 ${
                  isCompleted ? "bg-[--primary-60]" : "bg-[#B1B1B1]"
                }`}
              />
            )}
            <div
              className={`flex items-center justify-center w-12 h-12 rounded-full border-8 z-10 ${
                isCompleted
                  ? "border-[--primary-60] bg-white"
                  : "border-[#B1B1B1] bg-white"
              }`}
            >
              {isCompleted ? (
                <Check
                  className="text-[--primary-60]"
                  strokeWidth={4}
                  size={26}
                />
              ) : (
                <div className="w-6 h-6 rounded-full border-2 border-gray-300 m-1 bg-[#B1B1B1]" />
              )}
            </div>
            <div className="mt-2 text-center text-base font-semibold text-black">
              {label}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Stepper;
