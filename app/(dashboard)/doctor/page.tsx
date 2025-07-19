import React from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { SquareArrowOutUpRight } from "lucide-react";
import { ChartAreaGradient } from "./_components/AreaChart";
import { Calendar } from "@/components/ui/calendar";

const page = () => {
  return (
    <div className="px-2 py-4 md:px-6 md:py-8">
      <h1 className="text-2xl md:text-4xl font-bold mb-6">
        Здраствуйте , Иван Иванович !
      </h1>
      <div className="grid max-h-[750px] grid-cols-1 gap-6 lg:grid-cols-6 lg:grid-rows-2">
        {/* First Card */}
        <Card className="relative border-[--primary-60] flex flex-col justify-between min-h-[220px] lg:col-span-4 lg:row-span-1">
          <CardContent className="flex flex-col h-full justify-between p-4">
            <div>
              <h2 className="text-base sm:text-lg font-semibold mb-2">
                Сегодняшние приёмы{" "}
                <span className="text-[#9C9C9C] font-normal text-xs ml-3">
                  Посмотреть всех
                </span>
              </h2>
              <div className="space-y-4 mt-5">
                {[1, 2, 3, 4, 5].slice(0, 3).map((id) => (
                  <div
                    key={id}
                    className="border w-full sm:w-2/3 border-[--primary-60] max-w-full rounded-lg px-4 py-3 flex items-center gap-4 bg-white"
                  >
                    <span className="flex items-center justify-center bg-[--primary-60] rounded-md w-10 h-10">
                      <Image
                        src="/icons/identification.svg"
                        alt="id"
                        width={24}
                        height={24}
                      />
                    </span>
                    <div className="flex flex-col flex-1 min-w-0">
                      <span className="font-semibold text-sm sm:text-base leading-tight truncate">
                        Справка оформлена (Айдос А.)
                      </span>
                      <span className="text-[10px] sm:text-xs text-[#9C9C9C] mt-0.5">
                        12:10
                      </span>
                    </div>
                    <span className="flex items-center justify-center w-6 h-6">
                      <SquareArrowOutUpRight size={20} className="sm:size-6" />
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div className="hidden sm:block absolute right-0 bottom-0 w-28 h-28 md:w-36 md:h-36 lg:w-64 lg:h-[420px] pointer-events-none select-none z-10">
              <Image
                src="/illustrations/doctor-decoration.svg"
                alt="doctor"
                fill
                className="object-contain object-bottom"
              />
            </div>
          </CardContent>
        </Card>
        {/* Fourth Card */}
        <Card className="min-h-[220px] border-[--primary-60] flex flex-col lg:col-span-2 lg:row-span-2 lg:row-start-1 lg:col-start-5">
          <CardContent className="p-4 max-h-[500px] lg:max-h-[750px] flex-1 flex flex-col">
            <h2 className="text-lg font-semibold mb-2">Очередь на приём</h2>
            <div className="flex-1 space-y-2 overflow-y-auto">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 bg-[#F4F6FF] rounded-lg p-2"
                >
                  <div className="w-10 h-10 rounded-full bg-gray-300" />
                  <div>
                    <div className="font-medium">Иван Иванович</div>
                    <div className="text-xs text-gray-400">
                      17 Июнь, 2025 | 12:00 - 13:00
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        {/* Second Card */}
        <Card className="sm:min-h-[220px] border-[--primary-60] lg:col-span-2 lg:row-span-1 lg:row-start-2 lg:col-start-1">
          <CardContent className="p-4 flex flex-col justify-between items-center">
            <h2 className="text-lg font-semibold w-full">Календарь</h2>
            <Calendar
              mode="single"
              selected={new Date()}
              className="w-full sm:w-1/2 lg:w-64 bg-transparent mb-4"
            />
          </CardContent>
        </Card>
        {/* Third Card */}
        <Card className="min-h-[220px] border-[--primary-60] lg:col-span-2 lg:row-span-1 lg:row-start-2 lg:col-start-3">
          <CardContent className="p-0">
            <ChartAreaGradient />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default page;
