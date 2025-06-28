"use client";

import MyButton from "@/components/myui/MyButton";
import Input from "@/components/myui/Input";
import Logo from "@/components/Logo";
import Link from "next/link";
import React, { useState } from "react";
import { Eye, EyeClosed, RefreshCcw } from "lucide-react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import VerificationForm from "@/components/VerificationForm";
import DateCalendar from "@/components/myui/DateCalendar";

// Валидация
const registerSchema = z
  .object({
    lastname: z.string().min(1, "Фамилия обязательна"),
    firstname: z.string().min(1, "Имя обязательно"),
    middlename: z.string().min(1, "Отчество обязательно"),
    iin: z
      .string()
      .length(12, "ИИН должен содержать 12 цифр")
      .regex(/^\d+$/, "ИИН должен содержать только цифры"),
    phone: z.string().min(1, "Номер телефона обязателен"),
    email: z
      .string()
      .refine((val) => val === "" || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val), {
        message: "Неверный формат email",
      }),
    pass1: z.string().min(6, "Пароль должен содержать минимум 6 символов"),
    pass2: z.string().min(1, "Подтвердите пароль"),
    birthDate: z.date({ required_error: "Дата рождения обязательна" }),
  })
  .refine((data) => data.pass1 === data.pass2, {
    message: "Пароли не совпадают",
    path: ["pass2"],
  });

type RegisterFormData = z.infer<typeof registerSchema>;

const Register = () => {
  const [showPass1, setShowPass1] = useState(false);
  const [showPass2, setShowPass2] = useState(false);
  const [showVerification, setShowVerification] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    mode: "onChange",
    defaultValues: {
      lastname: "",
      firstname: "",
      middlename: "",
      iin: "",
      phone: "",
      email: "",
      pass1: "",
      pass2: "",
    },
  });

  const onSubmit = (data: RegisterFormData) => {
    const dataToSend = {
      ...data,
      phone: data.phone.startsWith("+") ? data.phone : "+" + data.phone,
      birthDate: data.birthDate.toISOString().split("T")[0],
    };
    console.log(dataToSend);
    setShowVerification(true);
  };

  if (showVerification) {
    return <VerificationForm maskedPhone={"********77"} />;
  }

  return (
    <div className="flex flex-col h-full max-h-[100vh]">
      <div className="sticky top-0 z-10 bg-white flex flex-col items-center sm:items-start pb-4">
        <Logo width={200} height={48} variant="blue" />
        <Link href="/login" className="mt-2 text-[15px]  hover:underline">
          У меня уже есть аккаунт
        </Link>
      </div>

      <form
        className="flex-1 h-full max-h-full overflow-y-auto flex flex-col gap-4 px-1 sm:px-0 mt-2 scrollbar-none"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div>
          <Input
            {...register("lastname")}
            placeholder="Фамилия*"
            error={errors.lastname?.message}
          />
        </div>

        <div>
          <Input
            {...register("firstname")}
            placeholder="Имя*"
            error={errors.firstname?.message}
          />
        </div>

        <div>
          <Input
            {...register("middlename")}
            placeholder="Отчество*"
            error={errors.middlename?.message}
          />
        </div>

        <div>
          <Input
            {...register("iin")}
            placeholder="ИИН*"
            error={errors.iin?.message}
          />
        </div>

        <div>
          <Controller
            name="birthDate"
            control={control}
            render={({ field }) => (
              <DateCalendar
                placeholder="Дата рождения*"
                date={field.value}
                onDateChange={field.onChange}
                error={errors.birthDate?.message}
              />
            )}
          />
        </div>

        <div
          className={`w-full relative min-h-[40px] px-4 py-2 rounded-[10px] border text-[--coolgray-60] placeholder:text-[--coolgray-60] flex items-center ${
            errors.phone ? "border-[--error] mb-4" : ""
          }`}
        >
          <Controller
            name="phone"
            control={control}
            render={({ field }) => (
              <PhoneInput
                country="kz"
                onlyCountries={["kz"]}
                enableSearch={false}
                disableDropdown={true}
                countryCodeEditable={false}
                containerClass="w-full"
                buttonClass="hidden"
                value={field.value}
                onChange={field.onChange}
                inputProps={{
                  name: "phone",
                  required: true,
                  className: `bg-transparent border-none outline-none w-full p-0 ${
                    errors.phone
                      ? "text-[--error] placeholder:text-[--error]"
                      : "text-[--coolgray-60] placeholder:text-[--coolgray-60]"
                  }`,
                  style: { boxShadow: "none" },
                  autoComplete: "off",
                }}
              />
            )}
          />
          {errors.phone && (
            <span className="text-red-500 text-xs absolute -bottom-5 left-0">
              {errors.phone.message}
            </span>
          )}
        </div>

        <div className="">
          <Input
            {...register("email")}
            placeholder="Email"
            type="email"
            error={errors.email?.message}
          />
        </div>

        <div>
          <Input
            {...register("pass1")}
            placeholder="Пароль*"
            type={showPass1 ? "text" : "password"}
            error={errors.pass1?.message}
            rightIcon={
              <span onClick={() => setShowPass1((v) => !v)} tabIndex={-1}>
                {showPass1 ? <EyeClosed size={20} /> : <Eye size={20} />}
              </span>
            }
          />
        </div>

        <div>
          <Input
            {...register("pass2")}
            placeholder="Повторите пароль*"
            type={showPass2 ? "text" : "password"}
            error={errors.pass2?.message}
            rightIcon={
              <span onClick={() => setShowPass2((v) => !v)} tabIndex={-1}>
                {showPass2 ? <EyeClosed size={20} /> : <Eye size={20} />}
              </span>
            }
          />
        </div>

        {/* TODO: Заменить на реальную Капчу */}
        <div className="flex flex-col gap-3">
          <div className="w-full h-20 bg-gray-200 rounded-[10px] flex items-center justify-center">
            <span className="text-gray-500 text-sm">Recaptcha Image</span>
          </div>
          <Input
            placeholder="Введите код с изображения*"
            rightIcon={
              <span
                onClick={() => console.log("Refresh recaptcha")}
                tabIndex={-1}
              >
                <RefreshCcw size={20} />
              </span>
            }
          />
        </div>

        <MyButton
          type="submit"
          className="my-4 w-full"
          size="medium"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Загрузка..." : "Запросить код подтверждения"}
        </MyButton>
      </form>
    </div>
  );
};

export default Register;
