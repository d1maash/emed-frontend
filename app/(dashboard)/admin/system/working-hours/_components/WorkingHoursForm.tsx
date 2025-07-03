"use client";
import React, { useEffect, useState } from "react";
import { z } from "zod";
import axios from "axios";
import { Label } from "@/components/ui/label";
import { TimePickerInput } from "@/components/myui/TimePickerInput";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import { Moon } from "lucide-react";

const days = [
  "Понедельник",
  "Вторник",
  "Среда",
  "Четверг",
  "Пятница",
  "Суббота",
  "Воскресенье",
];

const workingHourSchema = z.object({
  day: z.string(),
  from: z
    .string()
    .regex(/^([0-1]\d|2[0-3]):([0-5]\d)$/, "Неверный формат времени"),
  to: z
    .string()
    .regex(/^([0-1]\d|2[0-3]):([0-5]\d)$/, "Неверный формат времени"),
  enabled: z.boolean(),
});

type WorkingHour = z.infer<typeof workingHourSchema>;

const defaultHours: WorkingHour[] = days.map((day) => ({
  day,
  from: "09:00",
  to: "18:00",
  enabled: day !== "Суббота" && day !== "Воскресенье",
}));

const WorkingHoursForm: React.FC = () => {
  const [workingHours, setWorkingHours] = useState<WorkingHour[]>(defaultHours);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios
      .get("/api/working-hours")
      .then((res) => setWorkingHours(res.data))
      .catch(() => setWorkingHours(defaultHours))
      .finally(() => setLoading(false));
  }, []);

  const updateHour = async (index: number, updated: WorkingHour) => {
    const result = workingHourSchema.safeParse(updated);
    if (!result.success) {
      setError(result.error.errors[0].message);
      return;
    }
    setError(null);
    setWorkingHours((prev) => {
      const copy = [...prev];
      copy[index] = updated;
      return copy;
    });
    try {
      await axios.put(`/api/working-hours/${updated.day}`, updated);
    } catch {
      //   TODO: Add Sonar/Toast idk
    }
  };

  if (loading)
    return (
      // Можно добавить skeleton при загрузке, но сейчас времени нет
      <div className="w-full justify-start items-center text-start py-2 text-xl font-bold">
        Загрузка...
      </div>
    );

  return (
    <form className="w-max bg-white py-6 rounded-lg shadow space-y-4">
      <div className="flex justify-between border-b pb-2 pl-6 pr-8">
        <h4 className="text-lg font-semibold">Включить все</h4>

        <Switch checked={false} onCheckedChange={() => {}} className="" />
      </div>
      {workingHours.map((wh, idx) => (
        <div key={wh.day} className="flex items-center gap-4  pl-2 pr-8">
          <Switch
            checked={wh.enabled}
            onCheckedChange={(checked) =>
              updateHour(idx, { ...wh, enabled: !!checked })
            }
            className="ml-4"
            id={`checkbox-${wh.day}`}
          />
          <Label className="w-32 flex-shrink-0 whitespace-nowrap font-medium">
            {wh.day}
          </Label>
          <div className="flex gap-2 items-center">
            <TimePickerInput
              value={wh.from}
              onChange={(val) => updateHour(idx, { ...wh, from: val })}
              disabled={!wh.enabled}
              className={cn(
                "w-28 pl-24 font-medium",
                !wh.enabled && "text-transparent"
              )}
              leftIcon={
                !wh.enabled ? (
                  <Moon size={20} className="text-[--coolgray-60]" />
                ) : (
                  <div className="font-medium text-[--coolgray-60] pl-1">
                    От
                  </div>
                )
              }
              rightIcon={
                !wh.enabled && (
                  <div className="font-medium text-[--coolgray-60] pr-2">
                    Закрыто
                  </div>
                )
              }
            />
            <span>-</span>
            <TimePickerInput
              value={wh.to}
              onChange={(val) => updateHour(idx, { ...wh, to: val })}
              disabled={!wh.enabled}
              className={cn(
                "w-28 pl-24 font-medium",
                !wh.enabled && "text-transparent"
              )}
              leftIcon={
                !wh.enabled ? (
                  <Moon size={20} className="text-[--coolgray-60]" />
                ) : (
                  <div className="font-medium text-[--coolgray-60] pl-1">
                    До
                  </div>
                )
              }
              rightIcon={
                !wh.enabled && (
                  <div className="font-medium text-[--coolgray-60] pr-2">
                    Закрыто
                  </div>
                )
              }
            />
          </div>
        </div>
      ))}
    </form>
  );
};

export default WorkingHoursForm;
