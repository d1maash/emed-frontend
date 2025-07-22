"use client";

import { User } from "@/types/user";
import { api } from "@/utils/api";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const ConscriptQueuePage = () => {
  const { iin } = useParams();

  const [conscript, setConscript] = useState<User>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>("");

  useEffect(() => {
    if (!iin) return;

    const fetchConscriptData = async () => {
      try {
        const response = await api.post(
          "http://188.244.115.175/api/users/search/",
          {
            iin: iin,
          }
        ); // Проверка на успешность и наличие данных

        if (response.status === 200 && response.data) {
          setConscript(response.data);
        } else {
          setError("Данные не найдены.");
        }
      } catch (err) {
        console.error(err);
        setError("Ошибка при загрузке данных призывника.");
      } finally {
        setLoading(false);
      }
    };

    fetchConscriptData();
  }, [iin]);

  if (loading) {
    return <div>Загрузка данных...</div>;
  }

  if (error) {
    return <div style={{ color: "red" }}>{error}</div>;
  }

  return <div></div>;
};

export default ConscriptQueuePage;
