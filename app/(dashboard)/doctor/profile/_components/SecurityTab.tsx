"use client";
import React from "react";
import MyButton from "@/components/myui/MyButton";
import { Checkbox } from "@/components/ui/checkbox";
import { Table, TableBody, TableRow, TableCell } from "@/components/ui/table";

const SecurityTab = () => {
  return (
    <div className="bg-white rounded-xl border p-2 mt-5">
      <Table className="w-full">
        <TableBody>
          <TableRow>
            <TableCell colSpan={5}>Изменить пароль</TableCell>
          </TableRow>
          <TableRow className="border-t h-14">
            <TableCell className="w-1/4">Текущий пароль</TableCell>
            <TableCell colSpan={4} className="w-3/4">
              <input
                type="password"
                placeholder="Placeholder"
                className="w-full border rounded px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-200"
              />
            </TableCell>
          </TableRow>
          <TableRow className="border-t h-14">
            <TableCell>Новый пароль</TableCell>
            <TableCell colSpan={4}>
              <input
                type="password"
                placeholder="Placeholder"
                className="w-full border rounded px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-200"
              />
            </TableCell>
          </TableRow>
          <TableRow className="border-t h-14">
            <TableCell>Повторите новый пароль</TableCell>
            <TableCell colSpan={4}>
              <input
                type="password"
                placeholder="Placeholder"
                className="w-full border rounded px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-200"
              />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={5} className="pt-2 pb-2">
              <div className="flex justify-end">
                <MyButton size="small">Сохранить пароль</MyButton>
              </div>
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell colSpan={5}>Двухэтапная проверка</TableCell>
          </TableRow>
          <TableRow className="border-t h-14">
            <TableCell colSpan={5}>
              <div className="flex justify-center items-center gap-3">
                <Checkbox id="sms2fa" />
                <label htmlFor="sms2fa" className="cursor-pointer select-none">
                  Включить двухэтапную проверку по SMS
                </label>
              </div>
            </TableCell>
          </TableRow>
          <TableRow className="border-t h-14">
            <TableCell colSpan={5}>
              <div className="flex justify-center items-center gap-3">
                <Checkbox id="notify2fa" />
                <label
                  htmlFor="notify2fa"
                  className="cursor-pointer select-none"
                >
                  Уведомлять при входе с нового устройства
                </label>
              </div>
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell colSpan={5}>Сеансы входа</TableCell>
          </TableRow>
          <TableRow className="border-t h-14">
            <TableCell className="font-medium w-1/4">Устройство</TableCell>
            <TableCell className="font-medium w-1/4">Город</TableCell>
            <TableCell className="font-medium w-1/4">Дата входа</TableCell>
            <TableCell className="font-medium w-1/4">Действие</TableCell>
            <TableCell></TableCell>
          </TableRow>
          <TableRow className="border-t h-14">
            <TableCell>Chrome (Windows)</TableCell>
            <TableCell>Алматы</TableCell>
            <TableCell>17.06.2025, 14:22</TableCell>
            <TableCell>
              <MyButton size="small" variant="danger">
                Выйти
              </MyButton>
            </TableCell>
            <TableCell></TableCell>
          </TableRow>
          <TableRow className="border-t h-14">
            <TableCell>Safari (iPhone)</TableCell>
            <TableCell>Астана</TableCell>
            <TableCell>15.06.2025, 21:10</TableCell>
            <TableCell>
              <MyButton size="small" variant="danger">
                Выйти
              </MyButton>
            </TableCell>
            <TableCell></TableCell>
          </TableRow>
          <TableRow className="border-t h-14">
            <TableCell>Chrome (Android)</TableCell>
            <TableCell>Астана</TableCell>
            <TableCell>11.06.2025, 17:39</TableCell>
            <TableCell>
              <MyButton size="small" variant="danger">
                Выйти
              </MyButton>
            </TableCell>
            <TableCell></TableCell>
          </TableRow>
          <TableRow className="border-t h-14">
            <TableCell>Chrome (Windows)</TableCell>
            <TableCell>Алматы</TableCell>
            <TableCell>17.06.2025, 14:22</TableCell>
            <TableCell>
              <MyButton size="small" variant="danger">
                Выйти
              </MyButton>
            </TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <div className="flex justify-end mt-8">
        <MyButton size="medium">Сохранить настройки</MyButton>
      </div>
    </div>
  );
};

export default SecurityTab;
