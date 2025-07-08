"use client";

import React, { useState } from "react";
import MyButton from "@/components/myui/MyButton";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import Image from "next/image";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";

const mockProfile = {
  lastName: "Иванов",
  firstName: "Иван",
  middleName: "Иванович",
  birthDate: "02.03.2007",
  iin: "070302559020",
  phone: "+7 775 902 2020",
  email: "ivann2007@gmail.com",
  photo:
    "data:image/jpeg;base64,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", // Placeholder
};

const languageOptions = [
  { value: "ru", label: "Русский" },
  { value: "kz", label: "Қазақша" },
];

const notificationOptions = [
  { key: "email", label: "Получать уведомления на email" },
  { key: "remind", label: "Напоминать о приёме за 1 день" },
  {
    key: "newmsg",
    label: "Получать уведомления о новых сообщениях от врача или системы",
  },
  { key: "conclusion", label: "Сообщать, когда доступно заключение врача" },
];

const Page = () => {
  const [tab, setTab] = useState<"profile" | "security">("profile");
  const [language, setLanguage] = useState("ru");
  const [notifications, setNotifications] = useState({
    email: false,
    remind: false,
    newmsg: false,
    conclusion: false,
  });

  const handleSwitch = (key: string) => {
    setNotifications((prev) => ({
      ...prev,
      [key]: !prev[key as keyof typeof prev],
    }));
  };

  return (
    <div className="flex flex-col">
      <div className="flex gap-6 border-b w-full">
        <button
          className={`text-base pb-2 border-b-2 transition font-medium ${
            tab === "profile"
              ? "border-black text-black"
              : "border-transparent text-gray-500"
          }`}
          onClick={() => setTab("profile")}
        >
          Профиль
        </button>
        <button
          className={`text-base pb-2 border-b-2 transition font-medium ${
            tab === "security"
              ? "border-black text-black"
              : "border-transparent text-gray-500"
          }`}
          onClick={() => setTab("security")}
        >
          Безопасность аккаунта
        </button>
      </div>
      {tab === "profile" && (
        <div className="bg-white rounded-xl border p-2 mt-5 ">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead
                  colSpan={3}
                  className="font-semibold text-black text-base"
                >
                  Личные данные
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow className="border-t">
                <TableCell className="w-1/4 py-3">ФИО</TableCell>
                <TableCell className="w-2/4 py-3">{`${mockProfile.lastName} ${mockProfile.firstName} ${mockProfile.middleName}`}</TableCell>
                <TableCell className="w-1/4 py-3 text-right">
                  <MyButton variant="outline" size="small">
                    Редактировать
                  </MyButton>
                </TableCell>
              </TableRow>
              <TableRow className="border-t">
                <TableCell>Дата рождения</TableCell>
                <TableCell>{mockProfile.birthDate}</TableCell>
                <TableCell className="text-right">
                  <MyButton variant="outline" size="small">
                    Редактировать
                  </MyButton>
                </TableCell>
              </TableRow>
              <TableRow className="border-t">
                <TableCell>ИИН</TableCell>
                <TableCell>{mockProfile.iin}</TableCell>
                <TableCell className="text-right">
                  <MyButton variant="outline" size="small">
                    Редактировать
                  </MyButton>
                </TableCell>
              </TableRow>
              <TableRow className="border-t">
                <TableCell>Номер телефона</TableCell>
                <TableCell>{mockProfile.phone}</TableCell>
                <TableCell className="text-right">
                  <MyButton variant="outline" size="small">
                    Редактировать
                  </MyButton>
                </TableCell>
              </TableRow>
              <TableRow className="border-t">
                <TableCell>Email</TableCell>
                <TableCell>{mockProfile.email}</TableCell>
                <TableCell className="text-right">
                  <MyButton variant="outline" size="small">
                    Редактировать
                  </MyButton>
                </TableCell>
              </TableRow>
              <TableRow className="border-t">
                <TableCell>Фото профиля</TableCell>
                <TableCell>
                  <Image
                    src={mockProfile.photo}
                    alt="Фото профиля"
                    width={40}
                    height={40}
                    className="rounded-full object-cover"
                  />
                </TableCell>
                <TableCell className="text-right">
                  <MyButton variant="outline" size="small">
                    Редактировать
                  </MyButton>
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell
                  colSpan={3}
                  className="font-semibold text-base pt-6 pb-2"
                >
                  Предпочтения
                </TableCell>
              </TableRow>
              <TableRow className="border-t">
                <TableCell>Язык интерфейса</TableCell>
                <TableCell>
                  <Select value={language} onValueChange={setLanguage}>
                    <SelectTrigger className="w-40">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {languageOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </TableCell>
                <TableCell></TableCell>
              </TableRow>
              <TableRow className="border-t">
                <TableCell className="align-top pt-3">Уведомления</TableCell>
                <TableCell colSpan={2} className="pt-3">
                  <div className="flex flex-col gap-2">
                    {notificationOptions.map((option) => (
                      <label
                        key={option.key}
                        className="flex items-center gap-2 cursor-pointer"
                      >
                        <Checkbox
                          checked={
                            notifications[
                              option.key as keyof typeof notifications
                            ]
                          }
                          onCheckedChange={() => handleSwitch(option.key)}
                        />
                        <span>{option.label}</span>
                      </label>
                    ))}
                  </div>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <div className="flex justify-end mt-8">
            <MyButton size="medium">Сохранить настройки</MyButton>
          </div>
        </div>
      )}

      {tab === "security" && (
        <div className="text-center text-gray-400 py-16">
          Страница в разработке
        </div>
      )}
    </div>
  );
};

export default Page;
