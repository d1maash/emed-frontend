"use client";

import React, { useState } from "react";

import { Button } from "@/components/ui/Button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Image from "next/image";
import { ru } from "date-fns/locale";
import { cn } from "@/lib/utils";

function formatDate(date: Date | undefined) {
  if (!date) {
    return "";
  }

  return date.toLocaleDateString("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

interface BDCalendarProps {
  placeholder: string;
  date: Date | undefined;
  onDateChange: (date: Date | undefined) => void;
  error?: string;
}

export default function Calendar29({
  placeholder,
  date,
  onDateChange,
  error,
}: BDCalendarProps) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  return (
    <div className={`relative flex justify-center items-start flex-col`}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            id="date-picker"
            variant="ghost"
            className={cn(
              "w-full flex justify-start border min-w-[200px] min-h-[40px] px-4 py-2 rounded-[10px] text-[--coolgray-60] text-base font-normal",
              !!value && "text-black",
              !!error && "border-[--error]"
            )}
          >
            <Image
              alt="calendar"
              src="/icons/solar--calendar-linear.svg"
              className="h-5 w-5 opacity-70"
              width={20}
              height={20}
            />
            {!!value ? value : !!placeholder ? placeholder : "Выберите дату"}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto overflow-hidden p-0" align="end">
          <Calendar
            mode="single"
            selected={date}
            captionLayout="dropdown"
            onSelect={(date) => {
              onDateChange(date);
              setValue(formatDate(date));
              setOpen(false);
            }}
            locale={ru}
          />
        </PopoverContent>
      </Popover>
      {!!error && <p className="text-[--error] text-xs mt-1">{error}</p>}
    </div>
  );
}
