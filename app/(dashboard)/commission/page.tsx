"use client";

import DecorationCard from "@/components/myui/DecorationCard";
import { RecruitTable } from "./_components/recruit-table/RecruitTable";
import { Recruit } from "./_components/recruit-table/types";
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
    current_hearings = null,
    loading = false,
    error = null,
  } = useAppSelector((state) => state.commissionDashboard || {});
  const access = useAppSelector((state) => state.auth.access);
  const user = useAppSelector((state) => state.auth.user);
  const [globalFilter, setGlobalFilter] = useState("");

  useEffect(() => {
    if (user && user.role === "commission" && !current_hearings && access) {
      dispatch(getCommissionDashboard(access));
    }
  }, [user, current_hearings, access, dispatch]);

  if (!user || user.role !== "commission" || loading) return <LoadingScreen />;
  if (error) return <div className="text-red-500">{error}</div>;

  const hearings = Array.isArray(current_hearings) ? current_hearings : [];

  const filteredHearings = hearings.filter((h) => {
    const matchesText =
      h.conscript_name.toLowerCase().includes(globalFilter.toLowerCase()) ||
      String(h.id).includes(globalFilter);

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
          <RecruitTable data={filteredHearings} />

          {/* Сообщение когда нет поиска */}
          {!globalFilter ||
            (!loading && filteredHearings.length === 0 && (
              <div className="text-center p-8 text-gray-500">
                <Search className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                <p>Введите поисковый запрос для поиска</p>
                <p className="text-sm mt-2">
                  С текущими фильтрами ничего не найдено
                </p>
              </div>
            ))}
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

const recruits: Recruit[] = [
  {
    id: "10001",
    fullname: "Иванов Иван Сергеевич",
    iin: "010101123456",
    status: "Ждет решения",
  },
  {
    id: "10002",
    fullname: "Петров Артем Александрович",
    iin: "020202234567",
    status: "Решение принято",
  },
  {
    id: "10003",
    fullname: "Сидоров Максим Павлович",
    iin: "030303345678",
    status: "Ждет решения",
  },
  {
    id: "10004",
    fullname: "Ким Алексей Владимирович",
    iin: "040404456789",
    status: "Решение принято",
  },
  {
    id: "10005",
    fullname: "Ахметов Айдар Ерланович",
    iin: "050505567890",
    status: "Ждет решения",
  },
  {
    id: "10006",
    fullname: "Васильев Павел Дмитриевич",
    iin: "060606678901",
    status: "Решение принято",
  },
  {
    id: "10007",
    fullname: "Нурланов Данияр Ермекович",
    iin: "070707789012",
    status: "Ждет решения",
  },
  {
    id: "10008",
    fullname: "Кузнецов Олег Николаевич",
    iin: "080808890123",
    status: "Решение принято",
  },
  {
    id: "10009",
    fullname: "Ли Виктор Андреевич",
    iin: "090909901234",
    status: "Ждет решения",
  },
  {
    id: "10010",
    fullname: "Григорьев Сергей Юрьевич",
    iin: "101010012345",
    status: "Решение принято",
  },
  {
    id: "10011",
    fullname: "Морозов Дмитрий Алексеевич",
    iin: "111111123457",
    status: "Ждет решения",
  },
  {
    id: "10012",
    fullname: "Ковалев Антон Евгеньевич",
    iin: "121212234568",
    status: "Решение принято",
  },
  {
    id: "10013",
    fullname: "Смирнов Алексей Петрович",
    iin: "131313345679",
    status: "Ждет решения",
  },
  {
    id: "10014",
    fullname: "Волков Михаил Сергеевич",
    iin: "141414456780",
    status: "Решение принято",
  },
  {
    id: "10015",
    fullname: "Федоров Николай Иванович",
    iin: "151515567891",
    status: "Ждет решения",
  },
  {
    id: "10016",
    fullname: "Егоров Андрей Владимирович",
    iin: "161616678902",
    status: "Решение принято",
  },
  {
    id: "10017",
    fullname: "Соловьев Игорь Павлович",
    iin: "171717789013",
    status: "Ждет решения",
  },
  {
    id: "10018",
    fullname: "Макаров Владимир Олегович",
    iin: "181818890124",
    status: "Решение принято",
  },
  {
    id: "10019",
    fullname: "Зайцев Артем Валерьевич",
    iin: "191919901235",
    status: "Ждет решения",
  },
  {
    id: "10020",
    fullname: "Поляков Денис Александрович",
    iin: "202020012346",
    status: "Решение принято",
  },
  {
    id: "10021",
    fullname: "Белов Станислав Дмитриевич",
    iin: "212121123458",
    status: "Ждет решения",
  },
  {
    id: "10022",
    fullname: "Титов Владислав Сергеевич",
    iin: "222222234569",
    status: "Решение принято",
  },
  {
    id: "10023",
    fullname: "Комаров Александр Павлович",
    iin: "232323345680",
    status: "Ждет решения",
  },
  {
    id: "10024",
    fullname: "Орлов Руслан Андреевич",
    iin: "242424456791",
    status: "Решение принято",
  },
  {
    id: "10025",
    fullname: "Киселев Валерий Николаевич",
    iin: "252525567802",
    status: "Ждет решения",
  },
  {
    id: "10026",
    fullname: "Максимов Константин Алексеевич",
    iin: "262626678913",
    status: "Решение принято",
  },
  {
    id: "10027",
    fullname: "Гусев Алексей Владимирович",
    iin: "272727789024",
    status: "Ждет решения",
  },
  {
    id: "10028",
    fullname: "Калинин Артем Сергеевич",
    iin: "282828890135",
    status: "Решение принято",
  },
  {
    id: "10029",
    fullname: "Шевченко Виктор Павлович",
    iin: "292929901246",
    status: "Ждет решения",
  },
  {
    id: "10030",
    fullname: "Андреев Илья Андреевич",
    iin: "303030012357",
    status: "Решение принято",
  },
  {
    id: "10031",
    fullname: "Кузьмин Артем Олегович",
    iin: "313131123459",
    status: "Ждет решения",
  },
  {
    id: "10032",
    fullname: "Семенов Павел Валерьевич",
    iin: "323232234560",
    status: "Решение принято",
  },
  {
    id: "10033",
    fullname: "Сорокин Денис Евгеньевич",
    iin: "333333345671",
    status: "Ждет решения",
  },
  {
    id: "10034",
    fullname: "Трофимов Артем Сергеевич",
    iin: "343434456782",
    status: "Решение принято",
  },
  {
    id: "10035",
    fullname: "Фролов Вячеслав Владимирович",
    iin: "353535567893",
    status: "Ждет решения",
  },
  {
    id: "10036",
    fullname: "Сергеев Евгений Павлович",
    iin: "363636678904",
    status: "Решение принято",
  },
  {
    id: "10037",
    fullname: "Чернов Артем Алексеевич",
    iin: "373737789015",
    status: "Ждет решения",
  },
  {
    id: "10038",
    fullname: "Романов Виктор Дмитриевич",
    iin: "383838890126",
    status: "Решение принято",
  },
  {
    id: "10039",
    fullname: "Яковлев Андрей Сергеевич",
    iin: "393939901237",
    status: "Ждет решения",
  },
  {
    id: "10040",
    fullname: "Гаврилов Алексей Владимирович",
    iin: "404040012348",
    status: "Решение принято",
  },
];
