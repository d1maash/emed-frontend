"use client"

import * as React from "react"
import { parseDate } from "chrono-node"

import { Button } from "@/components/ui/Button"
import { Calendar } from "@/components/ui/calendar"
import { Label } from "@/components/ui/label"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import Input from "./myui/MyInput"
import Image from "next/image"

function formatDate(date: Date | undefined) {
  if (!date) {
    return ""
  }

  return date.toLocaleDateString("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  })
}

interface BDCalendarProps {
  placeholder: string,
  date: Date | undefined;
  onDateChange: (date: Date | undefined) => void;
}

export default function Calendar29({
  placeholder,
  date,
  onDateChange,
  ...props
}: BDCalendarProps) {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("In 2 days")
  const [month, setMonth] = React.useState<Date | undefined>(date)

  return (
    <div className="mt-2 md:mt-[30px] relative flex justify-center items-center">
      <Input
        id="date"
        variant="outline"
        value={value}
        placeholder={placeholder}
        className="w-full pl-14 pr-5 py-[15px]"
        onChange={(e) => {
          setValue(e.target.value)
          const date = parseDate(e.target.value)
          if (date) {
            onDateChange(date)
            setMonth(date)
          }
        }}
        onKeyDown={(e) => {
          if (e.key === "ArrowDown") {
            e.preventDefault()
            setOpen(true)
          }
        }}
        {...props}
      />
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            size="icon"
            id="date-picker"
            variant="ghost"
            className="absolute top-1/2 left-3.5 -translate-y-1/2"
          >
            <img alt="calendar" src="/icons/solar--calendar-linear.svg" className="h-8 w-8 opacity-70"/>
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
              onDateChange(date)
              setValue(formatDate(date))
              setOpen(false)
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}
