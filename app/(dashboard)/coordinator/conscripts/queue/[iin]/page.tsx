"use client";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  clearError,
  clearSearchResults,
  searchConscript,
} from "@/store/slices/searchSlice";
import { User } from "@/types/user";
import { api } from "@/utils/api";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

import { z } from "zod";

const searchSchema = z.object({
  iin: z
    .string()
    .min(12, "ИИН должен содержать 12 цифр")
    .max(12, "ИИН должен содержать 12 цифр")
    .regex(/^\d+$/, "ИИН должен содержать только цифры"),
});

const ConscriptQueuePage = () => {
  // const { iin } = useParams();

  const [iin, setIin] = useState("000000000001");

  const dispatch = useAppDispatch();
  const { searchResults, loading, error } = useAppSelector(
    (state) => state.search
  );
  const { access } = useAppSelector((state) => state.auth);

  const [validationError, setValidationError] = useState("");

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      searchSchema.parse({ iin });
      setValidationError("");

      if (access) {
        dispatch(clearError());
        await dispatch(searchConscript({ iin, access }));
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        setValidationError(error.errors[0].message);
      }
    }
  };

  const handleClear = () => {
    dispatch(clearSearchResults());
    setIin("");
    setValidationError("");
  };

  if (loading) {
    return <div>LOADINGЗагрузка данных...</div>;
  }

  if (error) {
    return <div style={{ color: "red" }}>ERROR{error}</div>;
  }

  return (
    <div>
      {searchResults?.first_name}
      <button
        onClick={(e) => {
          handleSearch(e);
        }}
      >
        Search
      </button>
    </div>
  );
};

export default ConscriptQueuePage;
