"use client";

import MyButton from "@/components/myui/MyButton";
import { Separator } from "@/components/ui/separator";
import DecorationCard from "./_components/DecorationCard";

const page = () => {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
      <div className="xl:col-span-2 flex flex-col gap-8 @container">
        <div>{/* Sorting for recruiter list/table */}Sorting</div>
        <div className="border w-full h-12 rounded-xl">
          {/* Recruiter list/table */}
        </div>
        <div className="grid @2xl:grid-cols-3 gap-6">
          <DecorationCard
            decorationName="shield"
            decorationPosition="bottom"
            colorVariant="white"
          >
            <div className="w-full grid grid-cols-2 gap-1">
              <div className="flex flex-col w-full">
                <h4 className="text-base font-medium">Label Name</h4>
                <div className="flex gap-1 justify-start items-center">
                  <h5 className="text-base font-medium">15%</h5>
                  <p className="text-xs text-muted-foreground">
                    Lorem ipsum dolor sit amet
                  </p>
                </div>
              </div>
              <div className="flex flex-col w-full">
                <h4 className="text-base font-medium">Label Name</h4>
                <div className="flex gap-1 justify-start items-center">
                  <h5 className="text-base font-medium">15%</h5>
                  <p className="text-xs text-muted-foreground">
                    Lorem ipsum dolor sit amet
                  </p>
                </div>
              </div>
            </div>
          </DecorationCard>
          <DecorationCard
            decorationName="calendar"
            decorationPosition="center"
            colorVariant="primary"
          >
            <div className="flex flex-col gap-2">
              <h4 className="font-medium">Количество дел со статусом</h4>
              <div className="flex gap-3 text-xs">
                <p>
                  Отсрочка: <span className="font-medium">5</span>
                </p>
                <p>
                  Отсрочка: <span className="font-medium">7</span>
                </p>
                <p>
                  Отсрочка: <span className="font-medium">24</span>
                </p>
              </div>
            </div>
          </DecorationCard>
          <DecorationCard decorationPosition="top" colorVariant="white">
            <div className="flex flex-col w-full">
              <h4 className="text-base font-medium">Label Name</h4>
              <div className="flex gap-1 justify-start items-center">
                <h5 className="text-base font-medium">15%</h5>
                <p className="text-xs text-muted-foreground">
                  Lorem ipsum dolor sit amet
                </p>
              </div>
            </div>
          </DecorationCard>
        </div>
      </div>
      <div className="border border-[--primary-60] w-full min-h-12 rounded-xl">
        {/* Schedule component */}
      </div>
    </div>
  );
};

export default page;
