"use client";

import MyButton from "@/components/myui/MyButton";
import MyInput from "@/components/myui/MyInput";
import Logo from "@/components/Logo";
import Link from "next/link";
import React, { useState } from "react";
import { Eye, EyeClosed } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginFormData, loginSchema } from "@/schemas/loginSchema";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { login, getMe, ecpLogin } from "@/store/slices/authSlice";
import { toast } from "sonner";
import type { RootState } from "@/store";
import { useRouter } from "next/navigation";
import LoadingScreen from "@/components/LoadingScreen";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const roleToDashboard: Record<string, string> = {
  admin: "/admin",
  commission: "/commission",
  coordinator: "/coordinator",
  doctor: "/doctor",
  conscript: "/recruit",
};

const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const base64 = (reader.result as string).split(",")[1];
      resolve(base64);
    };
    reader.onerror = (error) => reject(error);
  });
};

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);

  const [edsModalOpen, setEdsModalOpen] = useState(false);
  const [edsFile, setEdsFile] = useState<File | null>(null);
  const [edsPassword, setEdsPassword] = useState("");
  const [edsLoading, setEdsLoading] = useState(false);

  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state: RootState) => state.auth);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
    defaultValues: { iin: "", password: "" },
  });

  const handleRoleRedirect = (role: string) => {
    router.replace(roleToDashboard[role] || "/");
  };

  const onSubmit = async (data: LoginFormData) => {
    const resultAction = await dispatch(login(data));
    if (login.fulfilled.match(resultAction)) {
      toast.success(resultAction.payload.message || "Успешный вход");
      setIsRedirecting(true);
      const access = resultAction.payload.access;
      const userAction = await dispatch(getMe(access));
      if (getMe.fulfilled.match(userAction)) {
        handleRoleRedirect(userAction.payload.role);
      } else {
        setIsRedirecting(false);
        toast.error("Ошибка получения пользователя");
      }
    } else {
      const errorMsg =
        typeof resultAction.payload === "string"
          ? resultAction.payload
          : "Ошибка входа";
      toast.error(errorMsg);
    }
  };

  const handleEdsLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!edsFile || !edsPassword) {
      toast.error("Выберите файл и введите пароль");
      return;
    }
    setEdsLoading(true);
    try {
      const base64 = await fileToBase64(edsFile);
      const resultAction = await dispatch(
        ecpLogin({ p12_base64: base64, password: edsPassword })
      );
      if (ecpLogin.fulfilled.match(resultAction)) {
        toast.success("Вход по ЭЦП успешен");
        setEdsModalOpen(false);
        setEdsFile(null);
        setEdsPassword("");
        handleRoleRedirect(resultAction.payload.user.role);
      } else {
        const errorMsg =
          typeof resultAction.payload === "string"
            ? resultAction.payload
            : "Ошибка входа по ЭЦП";
        toast.error(errorMsg);
      }
    } catch (err) {
      toast.error("Ошибка чтения файла");
    } finally {
      setEdsLoading(false);
    }
  };

  return (
    <>
      {isRedirecting && <LoadingScreen />}
      <div className="flex flex-col items-center sm:items-start mb-8">
        <Logo width={200} height={48} variant="blue" />
      </div>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
        <MyInput
          {...register("iin")}
          placeholder="ИИН"
          autoComplete="iin"
          className="w-full"
          maxLength={12}
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
          disabled={isSubmitting || loading}
        >
          {loading ? "Вход..." : "Войти"}
        </MyButton>
        <MyButton
          type="button"
          className="w-full bg-[#FFC300] hover:bg-[#FFC300]/80"
          size="small"
          variant={"outline"}
          disabled={isSubmitting || edsLoading}
          onClick={() => setEdsModalOpen(true)}
        >
          {edsLoading ? "Вход по ЭЦП..." : "Войти по ЭЦП"}
        </MyButton>
      </form>
      <Dialog open={edsModalOpen} onOpenChange={setEdsModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Вход по ЭЦП</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleEdsLogin} className="flex flex-col gap-4">
            <input
              type="file"
              accept=".p12"
              onChange={(e) => setEdsFile(e.target.files?.[0] || null)}
              className="border rounded p-2"
              disabled={edsLoading}
            />
            <input
              type="password"
              placeholder="Пароль к .p12 файлу"
              value={edsPassword}
              onChange={(e) => setEdsPassword(e.target.value)}
              className="border rounded p-2"
              disabled={edsLoading}
            />
            <MyButton
              type="submit"
              className="w-full"
              size="small"
              disabled={edsLoading}
            >
              {edsLoading ? "Вход..." : "Войти"}
            </MyButton>
          </form>
        </DialogContent>
      </Dialog>
      <div className="flex justify-start mt-4 text-xs text-gray-500">
        <Link href="/reset-password" className="hover:underline">
          Забыли пароль?
        </Link>
      </div>
    </>
  );
};

export default Login;
