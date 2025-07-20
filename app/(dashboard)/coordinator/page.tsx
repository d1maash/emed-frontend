import { Card, CardContent } from "@/components/ui/card";
import { ChartPieDonut } from "./_components/ChartPieDonut";
import { ChartBarInteractive } from "./_components/ChartGraphic";
import { Calendar } from "@/components/ui/calendar";
import { ChartBarHorizontal } from "./_components/ChartBarHorizontal";
import Image from "next/image";
import { ChevronDown } from "lucide-react";

const page = () => {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-3">
        <ChartPieDonut className="col-span-1 lg:col-span-2" />

        <ChartBarInteractive
          period="year"
          className="col-span-1 md:col-span-1 lg:col-span-3"
        />

        <Card className="col-span-1 md:col-span-2 lg:col-span-2">
          <CardContent className="flex flex-col justify-between items-center">
            <Calendar
              mode="multiple"
              className="w-full bg-transparent whitespace-normal flex-nowrap max-w-[320px] sm:max-w-[350px] md:max-w-[300px] mx-auto p-2 sm:p-3 md:p-4 lg:p-6 rounded-2xl [&_[data-selected-single=true]]:bg-white [&_[data-selected-single=true]]:text-[--primary-60] [&_[data-selected-single=true]]:hover:bg-white [&_[data-selected-single=true]]:hover:text-[--primary-60]"
              classNames={{
                weekday:
                  " text-[0.8rem] font-normal flex-1 select-none  bg-[--primary-60] py-2 px-1 text-sm text-white",
                weekdays: "rounded-xl overflow-hidden flex",
                caption_label: "font-medium",
                nav_button: " hover:text-white/80",
              }}
            />
          </CardContent>
        </Card>

        <div className="flex flex-col gap-3 col-span-1 md:col-span-2 lg:col-span-2">
          <Card className="flex-1 relative bg-[#B3D1FF]">
            <CardContent className="h-full p-4 pb-0 flex flex-col justify-between">
              <div>
                <h3 className="font-medium">Количество дел со статусом:</h3>
                <div className="flex mt-5 text-sm items-center gap-2">
                  <p>Отсрочка: 5</p>
                  <p>Не годен: 7</p>
                  <p>Годен: 24</p>
                </div>
              </div>
              <Image
                src="/icons/table-card-icon.svg"
                alt="table"
                width={40}
                height={40}
                className="absolute right-0 bottom-0 z-10"
              />
            </CardContent>
          </Card>

          <Card className="flex-1 relative">
            <CardContent className="h-full p-4 pb-0 flex flex-row justify-between relative">
              <div className="flex flex-col flex-1">
                <h3 className="font-medium text-base mb-1">Label Name</h3>
                <div className="flex items-center gap-2 mt-3">
                  <p className="font-medium text-lg">15%</p>
                  <p className="text-xs text-gray-500">
                    Lorem ipsum dolor sit amet.
                  </p>
                </div>
              </div>
              <div className="flex flex-col flex-1">
                <h3 className="font-medium text-base mb-1">Label Name</h3>
                <div className="flex items-center gap-2 mt-3">
                  <p className="font-medium text-lg">15%</p>
                  <p className="text-xs text-gray-500">
                    Lorem ipsum dolor sit amet.
                  </p>
                </div>
              </div>
              <Image
                src="/icons/plus-card-icon.svg"
                alt="plus"
                width={40}
                height={40}
                className="absolute right-0 bottom-0 z-10"
              />
            </CardContent>
          </Card>
        </div>

        <Card className="col-span-1 md:col-span-2 lg:col-span-3 flex items-stretch">
          <CardContent className="p-3 h-full w-full flex flex-col justify-center">
            <ChartBarHorizontal />
          </CardContent>
        </Card>

        <Card className="col-span-1 md:col-span-2 lg:col-span-2 lg:row-span-2 shadow-none border-none bg-transparent">
          <CardContent className="max-h-[550px] p-2 overflow-y-auto w-full flex flex-col">
            <h2 className="text-2xl font-medium mb-2">Сегодня 23 июня</h2>
            <div className="flex items-center gap-4 mb-4">
              <div className="flex gap-2 text-base font-medium">
                <p className="text-sm">Время</p>
                <p className="text-sm">Последние события</p>
              </div>
              <div className="ml-auto">
                <button className="bg-[--primary-60] text-white rounded-lg px-3 py-1 text-xs flex items-center gap-1">
                  All
                  <span className="ml-1">
                    <ChevronDown className="size-3" />
                  </span>
                </button>
              </div>
            </div>
            <div className="relative flex-1 overflow-y-auto">
              <div className="absolute left-6 top-0 bottom-0 w-px bg-gray-200 z-0" />

              <div className="flex flex-col gap-3 relative z-10">
                {[0, 1, 2, 3, 4].map((i) => (
                  <div key={i} className="flex items-start gap-3 relative">
                    <span className="text-gray-400 text-sm w-10 text-right select-none">
                      9:23
                    </span>
                    <div className="bg-[#4F9CDA14] rounded-xl px-4 py-2 flex-1 shadow-sm">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="w-6 h-6 rounded-full bg-[#939393] inline-block" />
                        <span className="font-medium text-sm">Step Name</span>
                      </div>
                      <div className="text-xs text-gray-500 leading-tight">
                        Optional Label Optional Label Optional Label
                      </div>
                      <div className="text-xs text-gray-400 leading-tight mt-1">
                        Optional Label
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div
                className="absolute right-0 top-0 bottom-0 w-1 bg-[#EAF2FF] rounded-full"
                style={{ width: "4px" }}
              />
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-1 md:col-span-2 lg:col-span-2">
          <CardContent className="h-full p-4 flex flex-row justify-between relative">
            <div className="flex flex-col flex-1">
              <h3 className="font-medium text-base mb-1">Label Name</h3>
              <div className="flex items-center gap-2 mt-3">
                <p className="text-sm text-gray-500">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </p>
              </div>
            </div>
            <Image
              src="/icons/check-card-icon.svg"
              alt="plus"
              width={40}
              height={40}
              className="absolute right-0 bottom-0 z-10"
            />
          </CardContent>
        </Card>

        <Card className="col-span-1 md:col-span-1">
          <CardContent className="h-full p-4 flex flex-row justify-between relative">
            <div className="flex flex-col flex-1">
              <h3 className="font-medium text-base mb-1">Label Name</h3>
              <div className="flex items-center gap-2 mt-3">
                <p className="font-medium text-lg">15%</p>
                <p className="text-xs text-gray-500">
                  Lorem ipsum dolor sit amet.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-1 md:col-span-1">
          <CardContent className="h-full p-4 flex flex-row justify-between relative">
            <div className="flex flex-col flex-1">
              <h3 className="font-medium text-base mb-1">Label Name</h3>
              <div className="flex items-center gap-2 mt-3">
                <p className="font-medium text-lg">15%</p>
                <p className="text-xs text-gray-500">
                  Lorem ipsum dolor sit amet.
                </p>
              </div>
            </div>
            <Image
              src="/icons/plus-card-icon.svg"
              alt="plus"
              width={40}
              height={40}
              className="absolute right-0 bottom-0 z-10"
            />
          </CardContent>
        </Card>

        <Card className="col-span-1 md:col-span-1">
          <CardContent className="h-full p-4 flex flex-row justify-between relative">
            <div className="flex flex-col flex-1">
              <h3 className="font-medium text-base mb-1">Label Name</h3>
              <div className="flex items-center gap-2 mt-3">
                <p className="font-medium text-lg">15%</p>
                <p className="text-xs text-gray-500">
                  Lorem ipsum dolor sit amet.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default page;
