"use client";

import React, { useState } from "react";
import Input from "@/components/myui/Input";
import Button from "@/components/myui/Button";
import { Eye, EyeClosed } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { Controller } from "react-hook-form";

const emailSchema = z.object({
  email: z
    .string()
    .email("Введите корректный email")
    .min(1, "Обязательное поле"),
});
const phoneSchema = z.object({
  phone: z.string().min(6, "Введите корректный номер телефона"),
});
const codeSchema = z.object({
  code: z.string().min(1, "Введите код"),
});
const passwordSchema = z
  .object({
    newPassword: z
      .string()
      .min(8, "Минимум 8 символов")
      .regex(/[!#_+]/, "Пароль должен содержать хотя бы один из символов !#_+"),
    confirmPassword: z.string().min(1, "Подтвердите пароль"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Пароли не совпадают",
    path: ["confirmPassword"],
  });

const ResetPasswordPage = () => {
  const [step, setStep] = useState(1);
  const [mode, setMode] = useState<"email" | "phone">("email");
  const [showCode, setShowCode] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Step 1
  const emailForm = useForm({
    resolver: zodResolver(emailSchema),
    mode: "onChange",
    defaultValues: { email: "" },
  });
  const phoneForm = useForm({
    resolver: zodResolver(phoneSchema),
    mode: "onSubmit",
    defaultValues: { phone: "" },
  });

  // Step 2
  const codeForm = useForm({
    resolver: zodResolver(codeSchema),
    mode: "onChange",
    defaultValues: { code: "" },
  });

  // Step 3
  const passwordForm = useForm({
    resolver: zodResolver(passwordSchema),
    mode: "onChange",
    defaultValues: { newPassword: "", confirmPassword: "" },
  });

  return (
    <div className="">
      {step === 1 && (
        <>
          <h2 className="text-2xl font-bold mb-2">Забыли свой пароль?</h2>
          <div className="mb-2 text-sm">
            Введите свой{" "}
            {mode === "email"
              ? "электронный адрес"
              : "номер мобильного телефона"}
          </div>
          <div className="mb-6 text-xs text-gray-500">
            Вы можете получить от нас уведомление в WhatsApp и SMS для проверки
            безопасности и выполнения выхода.
          </div>

          {mode === "email" ? (
            <form
              className=""
              onSubmit={emailForm.handleSubmit(() => setStep(2))}
            >
              <Input
                placeholder="Электронный адрес"
                {...emailForm.register("email")}
                className=""
                error={emailForm.formState.errors.email?.message}
              />
              <Button
                className="w-full my-4"
                size="medium"
                type="submit"
                disabled={!emailForm.formState.isValid}
              >
                Продолжить
              </Button>
            </form>
          ) : (
            <form onSubmit={phoneForm.handleSubmit(() => setStep(2))}>
              <div
                className={`w-full relative min-h-[40px] px-4 py-2 rounded-[10px] border text-[--coolgray-60] placeholder:text-[--coolgray-60] flex items-center ${
                  phoneForm.formState.errors.phone ? "border-[--error]" : ""
                }`}
              >
                <Controller
                  name="phone"
                  control={phoneForm.control}
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
                          phoneForm.formState.errors.phone
                            ? "text-[--error] placeholder:text-[--error]"
                            : "text-[--coolgray-60] placeholder:text-[--coolgray-60]"
                        }`,
                        style: { boxShadow: "none" },
                        autoComplete: "off",
                      }}
                    />
                  )}
                />
                {phoneForm.formState.errors.phone && (
                  <span className="text-red-500 text-xs absolute -bottom-5 left-0">
                    {phoneForm.formState.errors.phone.message}
                  </span>
                )}
              </div>
              <Button
                className="w-full my-4"
                size="medium"
                type="submit"
                disabled={!phoneForm.formState.isValid}
              >
                Продолжить
              </Button>
            </form>
          )}
          {mode === "email" ? (
            <div
              className="text-center text-sm text-black/80 cursor-pointer hover:underline"
              onClick={() => setMode("phone")}
            >
              Искать по номеру телефона
            </div>
          ) : (
            <div
              className="text-center text-sm text-black/80 cursor-pointer hover:underline"
              onClick={() => setMode("email")}
            >
              Искать по электронному адресу
            </div>
          )}
        </>
      )}
      {step === 2 && (
        <form onSubmit={codeForm.handleSubmit(() => setStep(3))}>
          <h2 className="text-2xl font-bold mb-2">Подтвердите свой аккаунт</h2>
          <div className="mb-4 text-xs">
            Мы отправили вам код на ваш{" "}
            {mode === "email" ? "электронный адрес" : "номер телефона"}.
            <br />
            Введите код, чтобы подтвердить аккаунт.
          </div>
          <Input
            placeholder="Введите код"
            {...codeForm.register("code")}
            type={showCode ? "text" : "password"}
            className=""
            error={codeForm.formState.errors.code?.message}
            rightIcon={
              <span onClick={() => setShowCode((v) => !v)} tabIndex={-1}>
                {showCode ? <EyeClosed size={20} /> : <Eye size={20} />}
              </span>
            }
          />
          <Button
            className="w-full my-4"
            size="medium"
            type="submit"
            disabled={!codeForm.formState.isValid}
          >
            Продолжить
          </Button>
          <div
            className="text-center text-sm text-black/80 cursor-pointer hover:underline"
            onClick={() => alert("Код отправлен повторно")}
          >
            Отправить код повторно
          </div>
        </form>
      )}
      {step === 3 && (
        <form
          onSubmit={passwordForm.handleSubmit(() => alert("Пароль изменён!"))}
        >
          <h2 className="text-2xl font-bold mb-2">Создайте новый пароль</h2>
          <div className="mb-6 text-xs text-gray-500">
            Создайте пароль длиной не менее 8 символов, состоящий из букв, цифр
            и символов !#_+.
          </div>
          <Input
            placeholder="Новый пароль"
            {...passwordForm.register("newPassword")}
            type={showNewPassword ? "text" : "password"}
            className=""
            error={passwordForm.formState.errors.newPassword?.message}
            rightIcon={
              <span onClick={() => setShowNewPassword((v) => !v)} tabIndex={-1}>
                {showNewPassword ? <EyeClosed size={20} /> : <Eye size={20} />}
              </span>
            }
          />
          <Input
            placeholder="Подтвердите пароль"
            {...passwordForm.register("confirmPassword")}
            type={showConfirmPassword ? "text" : "password"}
            className="mt-2"
            error={passwordForm.formState.errors.confirmPassword?.message}
            rightIcon={
              <span
                onClick={() => setShowConfirmPassword((v) => !v)}
                tabIndex={-1}
              >
                {showConfirmPassword ? (
                  <EyeClosed size={20} />
                ) : (
                  <Eye size={20} />
                )}
              </span>
            }
          />
          <Button
            className="w-full my-4"
            size="medium"
            type="submit"
            disabled={!passwordForm.formState.isValid}
          >
            Продолжить
          </Button>
        </form>
      )}
    </div>
  );
};

export default ResetPasswordPage;
