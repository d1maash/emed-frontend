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
  photo: "/ava.jpg",
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

const ProfileTab = () => {
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
    <div className="bg-white rounded-xl border p-2 mt-5 ">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead colSpan={3}>Личные данные</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow className="border-t">
            <TableCell className="w-1/4 ">ФИО</TableCell>
            <TableCell className="w-2/4 ">{`${mockProfile.lastName} ${mockProfile.firstName} ${mockProfile.middleName}`}</TableCell>
            <TableCell className="w-1/4  text-right">
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
            <TableCell colSpan={3} className="h-14"></TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={3} className="h-14">
              Предпочтения
            </TableCell>
          </TableRow>
          <TableRow className="border-t h-14">
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
                        notifications[option.key as keyof typeof notifications]
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
  );
};

export default ProfileTab;
