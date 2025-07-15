"use client";

import { Button } from "@/components/ui/Button";
import { useRouter } from "next/navigation";
import React from "react";

const NotFound = () => {
  const router = useRouter();
  return (
    <div className="flex justify-between">
      <Button
        onClick={() => {
          router.back();
        }}
      >
        Вернуться назад
      </Button>
      <Button>Связаться с поддержкой</Button>
    </div>
  );
};

export default NotFound;
