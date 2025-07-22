"use client";

import MyButton from "@/components/myui/MyButton";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/Input";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const ConscriptsQueuePage = () => {
  const [search, onSearch] = useState("");
  const router = useRouter();

  const onQuery = () => {
    router.push("/coordinator/conscripts/queue/" + search);
  };

  return (
    <div className="w-full flex justify-center">
      <Card className="w-max flex items-center flex-col p-2">
        <CardHeader>
          <CardTitle>Поиск призивника</CardTitle>
          <CardDescription>
            Введите ИИН и нажмите кнопку
            <br /> для перехода на страницу настройки
          </CardDescription>
        </CardHeader>
        <CardContent className="w-full">
          <div className="relative w-full sm:w-auto">
            <Input
              className="pl-10 min-w-[240px] max-w-sm h-11 rounded-lg border border-gray-200 bg-white w-full"
              placeholder="Поиск по ИИН"
              type="text"
              value={search}
              onChange={(e) => onSearch(e.target.value)}
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          </div>
        </CardContent>
        <CardFooter className="w-full">
          <MyButton
            onClick={() => {
              onQuery();
            }}
            className="w-full py-3"
          >
            Найти
          </MyButton>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ConscriptsQueuePage;
