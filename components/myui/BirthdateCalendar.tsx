// src/components/ui/BirthdateCalendar.tsx
'use client'

import * as React from "react"
import { parseDate } from "chrono-node"
import Image from "next/image"

import { Button } from "@/components/ui/Button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import Input from "@/components/myui/MyInput"

function formatDate(date: Date | undefined): string {
  if (!date) {
    return ""
  }

  return date.toLocaleDateString("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  })
}

function validateAge(date: Date): { isValid: boolean; message?: string } {
  const today = new Date()
  const age = today.getFullYear() - date.getFullYear()
  const monthDiff = today.getMonth() - date.getMonth()
  
  // Adjust age if birthday hasn't occurred this year
  const actualAge = monthDiff < 0 || (monthDiff === 0 && today.getDate() < date.getDate()) 
    ? age - 1 
    : age

  if (actualAge < 18) {
    return { isValid: false, message: "Возраст должен быть не менее 18 лет" }
  }
  
  if (actualAge > 100) {
    return { isValid: false, message: "Возраст не должен превышать 100 лет" }
  }
  
  if (date > today) {
    return { isValid: false, message: "Дата рождения не может быть в будущем" }
  }

  return { isValid: true }
}

interface BirthdateCalendarProps {
  placeholder?: string
  date: Date | undefined
  onDateChange: (date: Date | undefined) => void
  error?: string
  isRequired?: boolean
  disabled?: boolean
  className?: string
}

export default function BirthdateCalendar({
  placeholder = "Выберите дату рождения",
  date,
  onDateChange,
  error,
  isRequired = false,
  disabled = false,
  className,
  ...props
}: BirthdateCalendarProps) {
  const [open, setOpen] = React.useState(false)
  const [inputValue, setInputValue] = React.useState("")
  const [month, setMonth] = React.useState<Date | undefined>(date)
  const [validationError, setValidationError] = React.useState<string>("")

  // Initialize input value when date changes
  React.useEffect(() => {
    if (date) {
      setInputValue(formatDate(date))
      setMonth(date)
    }
  }, [date])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setInputValue(value)
    setValidationError("")

    if (!value.trim()) {
      onDateChange(undefined)
      return
    }

    try {
      const parsedDate = parseDate(value)
      if (parsedDate) {
        const validation = validateAge(parsedDate)
        if (validation.isValid) {
          onDateChange(parsedDate)
          setMonth(parsedDate)
        } else {
          setValidationError(validation.message || "")
          onDateChange(undefined)
        }
      }
    } catch (error) {
      console.warn("Date parsing error:", error)
    }
  }

  const handleDateSelect = (selectedDate: Date | undefined) => {
    if (!selectedDate) {
      onDateChange(undefined)
      setInputValue("")
      setOpen(false)
      return
    }

    const validation = validateAge(selectedDate)
    if (validation.isValid) {
      onDateChange(selectedDate)
      setInputValue(formatDate(selectedDate))
      setValidationError("")
    } else {
      setValidationError(validation.message || "")
    }
    setOpen(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault()
      setOpen(true)
    }
    if (e.key === "Escape") {
      setOpen(false)
    }
  }

  // Calculate min/max dates for calendar
  const today = new Date()
  const minDate = new Date(today.getFullYear() - 100, today.getMonth(), today.getDate())
  const maxDate = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate())

  const displayError = error || validationError

  return (
    <div className={`mt-2 md:mt-[30px]`}>

      <div className="relative flex justify-center items-center">
        <Input
          id="birthdate"
          variant="outline"
          value={inputValue}
          placeholder={placeholder}
          className='w-full pl-14 pr-5 py-[15px]'
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          {...props}
        />
        
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              type="button"
              size="icon"
              variant="ghost"
              className="absolute top-1/2 left-3.5 -translate-y-1/2"
              disabled={disabled}
              aria-label="Открыть календарь"
            >
              <Image
                src="/icons/solar--calendar-linear.svg"
                alt="Календарь"
                width={32}
                height={32}
                className="opacity-70"
              />
            </Button>
          </PopoverTrigger>
          
          <PopoverContent className="w-auto overflow-hidden p-0" align="end">
            <Calendar
              mode="single"
              selected={date}
              captionLayout="dropdown"
              month={month}
              onMonthChange={setMonth}
              onSelect={handleDateSelect}
              hidden={{
                before: minDate,
                after: maxDate
                }}
              defaultMonth={maxDate}
              showOutsideDays={false}
              fixedWeeks
            />
          </PopoverContent>
        </Popover>
      </div>

      {displayError && (
        <p className="text-sm text-(--error)">{displayError}</p>
      )}
    </div>
  )
}
