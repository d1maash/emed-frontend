"use client";

import { useState } from "react";
import { parseDate } from "chrono-node";

import { Button } from "@/components/ui/Button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Input from "./myui/Input";

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
  const [month, setMonth] = useState<Date | undefined>(date);

  return (
    <div
      className={`relative flex justify-center items-center ${
        error ? "border-[--error]" : ""
      }`}
    >
      <Input
        id="date"
        value={value}
        placeholder={placeholder}
        className="w-full pl-12 pr-5"
        error={error}
        onChange={(e) => {
          setValue(e.target.value);
          const date = parseDate(e.target.value);
          if (date) {
            onDateChange(date);
            setMonth(date);
          }
        }}
        onKeyDown={(e) => {
          if (e.key === "ArrowDown") {
            e.preventDefault();
            setOpen(true);
          }
        }}
      />
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            size="icon"
            id="date-picker"
            variant="ghost"
            className={`absolute top-1/2 left-2 ${
              error ? "-translate-y-2/3" : "-translate-y-1/2"
            }`}
          >
            <img
              alt="calendar"
              src="/icons/solar--calendar-linear.svg"
              className="h-5 w-5 opacity-70"
            />
            <span className="sr-only">Выберите дату</span>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto overflow-hidden p-0" align="end">
          <Calendar
            mode="single"
            selected={date}
            captionLayout="dropdown"
            month={month}
            onMonthChange={setMonth}
            onSelect={(date) => {
              onDateChange(date);
              setValue(formatDate(date));
              setOpen(false);
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
