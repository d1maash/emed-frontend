"use client";

import MyButton from "@/components/myui/MyButton";
import MyInput from "@/components/myui/MyInput";
import Logo from "@/components/Logo";
import Link from "next/link";
import React, { useState } from "react";
import { Eye, EyeClosed } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { LoginFormData, loginSchema } from "@/schemas/loginSchema";

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
      iin: "",
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
          {...register("iin")}
          placeholder="ИИН"
          autoComplete="iin"
          className="w-full"
          error={errors.iin?.message}
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
        <MyButton
          type="submit"
          className="mt-2 w-full"
          size="small"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Вход..." : "Войти"}
        </MyButton>
        <MyButton
          type="button"
          className=" w-full"
          size="small"
          variant={"outline"}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Вход..." : "Войти по ЭЦП"}
        </MyButton>
      </form>
      <div className="flex justify-start mt-4 text-xs text-gray-500">
        <Link href="/reset-password" className="hover:underline">
          Забыли пароль?
        </Link>
      </div>
    </>
  );
};

export default Login;
