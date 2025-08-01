"use client";

import DecorationCard from "@/components/myui/DecorationCard";
import { RecruitTable } from "./_components/recruit-table/RecruitTable";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/Input";
import { Search } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { ru } from "date-fns/locale";
import { Separator } from "@/components/ui/separator";
import DateBlocks, { MeetingBlock } from "./_components/DateBlocks";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import LoadingScreen from "@/components/LoadingScreen";
import { getCommissionDashboard } from "@/store/slices/commissionDashboardSlice";

const Page = () => {
  const dispatch = useAppDispatch();
  const {
    data = null,
    hearingList = null,
    loading = false,
    error = null,
  } = useAppSelector((state) => state.commissionDashboard || {});
  const access = useAppSelector((state) => state.auth.access);
  const user = useAppSelector((state) => state.auth.user);
  const [globalFilter, setGlobalFilter] = useState("");

  useEffect(() => {
    if (user && user.role === "commission" && !hearingList && access) {
      dispatch(getCommissionDashboard(access));
    }
  }, [data, user, hearingList, access, dispatch]);

  if (!user || user.role !== "commission" || loading) return <LoadingScreen />;
  if (error) return <div className="text-red-500">{error}</div>;

  const commissionHearingList = Array.isArray(hearingList) ? hearingList : [];

  const filteredRecruits = commissionHearingList.filter((r) => {
    const matchesText =
      r.conscript_name.toLowerCase().includes(globalFilter.toLowerCase()) ||
      String(r.id).includes(globalFilter);

    return matchesText;
  });

  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
      <div className="xl:col-span-2 flex flex-col gap-8 @container">
        <div className="max-w-md relative h-max">
          <Input
            placeholder="Поиск по ФИО или ID"
            value={globalFilter}
            onChange={(e) => setGlobalFilter(e.target.value)}
            className="w-full bg-white shadow-none pl-10"
          />
          <Search
            className="text-[--coolgray-90] absolute left-3 top-1/2 -translate-y-1/2"
            size={16}
          />
        </div>
        <div className="border w-full rounded-xl">
          <RecruitTable data={filteredRecruits} />
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
      <div className="flex flex-col gap-4 border border-[--primary-60] min-h-12 rounded-xl bg-white overflow-y-auto h-max max-h-[85vh]">
        <Calendar
          locale={ru}
          mode="multiple"
          selected={[new Date()]}
          // onSelect={setDate}
          className=" w-full whitespace-normal flex-nowrap max-w-[320px] sm:max-w-[350px] md:max-w-[380px] lg:max-w-[400px] mx-auto p-2 sm:p-3 md:p-4 lg:p-6 rounded-2xl  [&_[data-selected-single=true]]:bg-white [&_[data-selected-single=true]]:text-[--primary-60] [&_[data-selected-single=true]]:hover:bg-white [&_[data-selected-single=true]]:hover:text-[--primary-60]"
          classNames={{
            weekday:
              " text-[0.8rem] font-normal flex-1 select-none  bg-[--primary-60] py-2 px-1 text-sm text-white",
            weekdays: "rounded-xl overflow-hidden flex",
            caption_label: "font-medium",
            nav_button: " hover:text-white/80",
          }}
        />
        <div className="mx-4">
          <Separator orientation="horizontal" />
        </div>
        <div className="overflow-y-auto">
          <DateBlocks meetings={meetings} />
        </div>
      </div>
    </div>
  );
};

export default Page;

const meetings: MeetingBlock[] = [
  {
    id: "block001",
    day: "Пн",
    date: "23",
    title: "Совещание",
    time: "10:00",
    room: "№4 каб.",
  },
  {
    id: "block002",
    day: "Пн",
    date: "23",
    title: "Совещание",
    time: "10:00",
    room: "№4 каб.",
  },
  {
    id: "block003",
    day: "Пт",
    date: "20",
    title: "Совещание",
    time: "10:00",
    room: "№4 каб.",
  },
  {
    id: "block004",
    day: "Пт",
    date: "20",
    title: "Совещание",
    time: "10:00",
    room: "№4 каб.",
  },
  {
    id: "block005",
    day: "Пт",
    date: "20",
    title: "Совещание",
    time: "10:00",
    room: "№4 каб.",
  },
  {
    id: "block006",
    day: "Пт",
    date: "20",
    title: "Совещание",
    time: "10:00",
    room: "№4 каб.",
  },
];
