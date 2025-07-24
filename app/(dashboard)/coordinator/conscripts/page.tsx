"use client";

import React, { useCallback, useEffect, useState } from "react";
import { CoordinatorConscriptsTable } from "./_components/conscripts-table/CoordinatorConscriptsTable";
import { Input } from "@/components/ui/Input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Download, Plus, Search, SlidersHorizontal } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { User } from "@/types/user";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  clearConscripts,
  listConscripts,
} from "@/store/slices/conscriptsSlice";
import z from "zod";
import { useDebounce } from "@/app/hooks/useDebounce";

const STATUSES = [
  { value: "Ожидает приема", label: "Ожидает приема" },
  { value: "На приеме", label: "На приеме" },
  { value: "Завершено", label: "Завершено" },
  { value: "На комиссии", label: "На комиссии" },
  { value: "Результат готов", label: "Результат готов" },
];

const VOENKOMATS = [
  { value: "Полномочия", label: "Полномочия" },
  { value: "Первичный", label: "Первичный" },
];

const searchSchema = z.object({
  search: z
    .string()
    .min(1, "Введите поисковый запрос")
    .max(50, "Максимальная длина запроса 50 символов")
    .optional(),
});

const CoordinatorConscriptsPage = () => {
  // tools
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useAppDispatch();

  // redux state
  const { data, loading, error } = useAppSelector((state) => state.conscripts);
  const { access } = useAppSelector((state) => state.auth);

  // params
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<string | undefined>(undefined);
  const [voenkomat, setVoenkomat] = useState<string | undefined>(undefined);
  const [validationError, setValidationError] = useState("");

  const debouncedSearch = useDebounce(search, 1000);

  // initURLParams - только восстанавливаем состояние из URL
  useEffect(() => {
    const searchParam = searchParams.get("search");
    const statusParam = searchParams.get("status");
    const voenkomatParam = searchParams.get("voenkomat");

    if (searchParam) setSearch(searchParam);
    if (statusParam) setStatus(statusParam);
    if (voenkomatParam) setVoenkomat(voenkomatParam);
  }, [searchParams]);

  // update URLParams
  const updateSearchParams = useCallback(
    (updates: { search?: string; status?: string; voenkomat?: string }) => {
      const params = new URLSearchParams(searchParams.toString());

      Object.entries(updates).forEach(([key, value]) => {
        if (value && value.trim() !== "") {
          params.set(key, value);
        } else {
          params.delete(key);
        }
      });

      router.replace(`?${params.toString()}`);
    },
    [searchParams, router]
  );

  // API request function
  const performSearch = useCallback(
    async (searchTerm: string) => {
      if (!access) return;

      if (!searchTerm.trim()) {
        dispatch(clearConscripts());
        return;
      }

      try {
        searchSchema.parse({ search: searchTerm });
        setValidationError("");

        const result = await dispatch(
          listConscripts({
            search: searchTerm,
            access,
          })
        );

        if (listConscripts.fulfilled.match(result)) {
          updateSearchParams({ search: searchTerm });
        }
      } catch (err) {
        if (err instanceof z.ZodError) {
          setValidationError(err.errors[0].message);
        }
      }
    },
    [access, dispatch, updateSearchParams]
  );

  // Debounced search - выполняется только при изменении поискового запроса
  useEffect(() => {
    if (debouncedSearch.trim()) {
      performSearch(debouncedSearch);
    } else {
      // Очищаем результаты если поле поиска пустое
      dispatch(clearConscripts());
      updateSearchParams({ search: "" });
    }
  }, [debouncedSearch, performSearch]);

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setValidationError("");
  };

  const handleStatusChange = (value: string) => {
    const newStatus = value === "" ? undefined : value;
    setStatus(newStatus);
    updateSearchParams({ status: value });
  };

  const handleVoenkomatChange = (value: string) => {
    const newVoenkomat = value === "" ? undefined : value;
    setVoenkomat(newVoenkomat);
    updateSearchParams({ voenkomat: value });
  };

  // clear
  const clearAllFilters = () => {
    setSearch("");
    setStatus(undefined);
    setVoenkomat(undefined);
    setValidationError("");
    dispatch(clearConscripts());
    router.replace(window.location.pathname);
  };

  const hasActiveFilters = search || status || voenkomat;
  const conscriptsData = Array.isArray(data) ? data : [];

  const filteredConscripts = conscriptsData.filter((c: User) => {
    const matchesStatus = status ? true : true; // Временно пропускаем фильтрацию по статусу
    const matchesVoenkomat = voenkomat
      ? c.coordinator_profile?.district === voenkomat
      : true;

    return matchesStatus && matchesVoenkomat;
  });

  return (
    <div className="w-full flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-4 mb-2">
        <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 w-full">
          <div className="relative w-full sm:w-auto">
            <Input
              className="pl-10 min-w-[240px] max-w-xs h-11 rounded-lg border border-gray-200 bg-white w-full"
              placeholder="Поиск по ФИО или ID"
              type="text"
              value={search}
              onChange={(e) => handleSearchChange(e.target.value)}
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            {/* Индикатор загрузки */}
            {loading && (
              <div className="absolute right-3 top-1/2 -translate-y-1/2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
              </div>
            )}
          </div>

          <Select value={status || ""} onValueChange={handleStatusChange}>
            <SelectTrigger className="h-11 rounded-lg border border-gray-200 bg-white w-auto flex items-center gap-2">
              <SelectValue placeholder="Статус" />
              <SlidersHorizontal className="ml-2 w-4 h-4 text-gray-400" />
            </SelectTrigger>
            <SelectContent>
              {STATUSES.map((statusOption) => (
                <SelectItem key={statusOption.value} value={statusOption.value}>
                  {statusOption.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={voenkomat || ""} onValueChange={handleVoenkomatChange}>
            <SelectTrigger className="h-11 rounded-lg border border-gray-200 bg-white w-auto flex items-center gap-2">
              <SelectValue placeholder="Военкомат" />
              <SlidersHorizontal className="ml-2 w-4 h-4 text-gray-400" />
            </SelectTrigger>
            <SelectContent>
              {VOENKOMATS.map((v) => (
                <SelectItem key={v.value} value={v.value}>
                  {v.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {hasActiveFilters && (
            <button
              className="h-11 rounded-lg border border-gray-200 bg-white w-auto flex items-center gap-2 text-sm px-3 shadow-sm text-muted-foreground hover:bg-gray-50 transition"
              onClick={clearAllFilters}
            >
              Сбросить фильтры
            </button>
          )}
        </div>

        <div className="flex items-center gap-3">
          <button className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition">
            <Download className="w-5 h-5 text-gray-700" />
          </button>
          <button className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition">
            <Plus className="w-5 h-5 text-gray-700" />
          </button>
        </div>
      </div>

      {/* Показываем ошибки валидации */}
      {validationError && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
          {validationError}
        </div>
      )}

      {/* Показываем активные фильтры */}
      {hasActiveFilters && conscriptsData.length > 0 && (
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <span>Найдено результатов:</span>
          <span className="font-medium">{filteredConscripts.length}</span>
          {search && (
            <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
              "{search}"
            </span>
          )}
        </div>
      )}

      <CoordinatorConscriptsTable
        data={filteredConscripts}
        isLoading={loading}
        error={error}
      />

      {/* Сообщение когда нет поиска */}
      {!search && !loading && conscriptsData.length === 0 && (
        <div className="text-center p-8 text-gray-500">
          <Search className="w-12 h-12 mx-auto mb-4 text-gray-300" />
          <p>Введите поисковый запрос для поиска призывников</p>
          <p className="text-sm mt-2">Начните вводить ФИО или ИИН призывника</p>
        </div>
      )}
    </div>
  );
};

export default CoordinatorConscriptsPage;
