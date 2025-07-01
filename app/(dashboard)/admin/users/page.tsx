"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Download, Plus, Search } from "lucide-react";
import { users } from "./_components/admin-users-table/data";
import { Input } from "@/components/ui/Input";
import { AdminUsersTable } from "./_components/admin-users-table/AdminUsersTable";
import {
  Select,
  SelectItem,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const ROLES = [
  { value: "recruit", label: "Призывник" },
  { value: "doctor", label: "Врач" },
  { value: "coordinator", label: "Координатор" },
  { value: "commission", label: "Комиссия" },
];

const STATUSES = [
  { value: "active", label: "Активен" },
  { value: "blocked", label: "Заблокирован" },
];

const AdminUsersPage = () => {
  const [globalFilter, setGlobalFilter] = useState("");
  const [roleFilter, setRoleFilter] = useState<string | undefined>();
  const [statusFilter, setStatusFilter] = useState<string | undefined>();

  const filteredUsers = users.filter((u) => {
    const matchesText =
      u.name.toLowerCase().includes(globalFilter.toLowerCase()) ||
      String(u.id).includes(globalFilter);

    const matchesRole = roleFilter
      ? (roleFilter === "recruit" && u.role === "Призывник") ||
        (roleFilter === "doctor" && u.role === "Врач") ||
        (roleFilter === "coordinator" && u.role === "Координатор") ||
        (roleFilter === "commission" && u.role === "Комиссия")
      : true;

    const matchesStatus = statusFilter
      ? (statusFilter === "active" && u.status === "Активен") ||
        (statusFilter === "blocked" && u.status === "Заблокирован")
      : true;

    return matchesText && matchesRole && matchesStatus;
  });

  return (
    <div className="w-full flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 className="text-3xl font-medium">Пользователи</h1>
      </div>
      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-2 md:gap-4">
        <div className="max-w-md relative">
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
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[180px] bg-white shadow-none">
            <SelectValue placeholder="Статус" />
          </SelectTrigger>
          <SelectContent>
            {STATUSES.map((s) => (
              <SelectItem key={s.value} value={s.value}>
                {s.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={roleFilter} onValueChange={setRoleFilter}>
          <SelectTrigger className="w-[180px] bg-white shadow-none">
            <SelectValue placeholder="Роль" />
          </SelectTrigger>
          <SelectContent>
            {ROLES.map((r) => (
              <SelectItem key={r.value} value={r.value}>
                {r.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <div className="flex gap-2 ml-auto">
          <Button variant="ghost" size="icon">
            <Download className="w-6 h-6" />
          </Button>
          <Button variant="ghost" size="icon">
            <Plus className="w-6 h-6" />
          </Button>
        </div>
      </div>
      {/* Table */}
      <AdminUsersTable data={filteredUsers} />
    </div>
  );
};

export default AdminUsersPage;
