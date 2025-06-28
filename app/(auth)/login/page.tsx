"use client";

import Button from "@/components/myui/MyButton";
import MyInput from "@/components/myui/MyInput";
import Logo from "@/components/Logo";
import Link from "next/link";
import React, { useState } from "react";
import { Eye, EyeClosed, EyeOff } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

// Валидация
const loginSchema = z.object({
  login: z.string().min(1, "Логин обязателен"),
  password: z.string().min(1, "Пароль обязателен"),
});

type LoginFormData = z.infer<typeof loginSchema>;

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
    defaultValues: {
      login: "",
      password: "",
    },
  });

  const onSubmit = (data: LoginFormData) => {
    console.log(data);
    // TODO:
  };

  return (
    <>
      <div className="flex flex-col items-center sm:items-start mb-8">
        <Logo width={200} height={48} variant="blue" />
      </div>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
        <MyInput
          {...register("login")}
          placeholder="Логин"
          autoComplete="username"
          className="w-full"
          error={errors.login?.message}
        />
        <MyInput
          {...register("password")}
          placeholder="Пароль"
          type={showPassword ? "text" : "password"}
          autoComplete="current-password"
          className="w-full"
          error={errors.password?.message}
          rightIcon={
            <span onClick={() => setShowPassword((v) => !v)} tabIndex={-1}>
              {showPassword ? <EyeClosed size={20} /> : <Eye size={20} />}
            </span>
          }
        />
        <Button
          type="submit"
          className="mt-2 w-full"
          size="medium"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Вход..." : "Войти"}
        </Button>
      </form>
      <div className="flex justify-between mt-4 text-xs text-gray-500">
        <Link href="/reset-password" className="hover:underline">
          Забыли пароль?
        </Link>
        <Link href="/register" className="hover:underline">
          Зарегистрироваться
        </Link>
      </div>
    </>
  );
};

export default Login;
