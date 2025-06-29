"use client";

import React, { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  registrationSchema,
  RegistrationFormData,
} from "@/schemas/registrationSchema";
import {
  setFormData,
  sendPhoneVerification,
  clearError,
} from "@/store/slices/registrationSlice";
import { RootState, AppDispatch } from "@/store";
import MyInput from "@/components/myui/MyInput";
import {
  GoogleCaptcha,
  GoogleCaptchaRef,
} from "@/components/myui/GoogleCaptcha";
import MyButton from "@/components/myui/MyButton";
import DateCalendar from "@/components/myui/DateCalendar";
import PhoneInput from "react-phone-input-2";
import { Eye, EyeClosed } from "lucide-react";
import "react-phone-input-2/lib/style.css";

export const RegistrationForm: React.FC = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { isLoading, error } = useSelector(
    (state: RootState) => state.registration
  );
  const captchaRef = useRef<GoogleCaptchaRef>(null);

  const [showPass1, setShowPass1] = useState(false);
  const [showPass2, setShowPass2] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    control,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<RegistrationFormData>({
    resolver: zodResolver(registrationSchema),
    mode: "onChange",
    defaultValues: {
      lastName: "",
      firstName: "",
      middleName: "",
      iin: "",
      phone: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const recaptchaToken = watch("recaptchaToken");

  const handleCaptchaChange = (token: string | null) => {
    if (token) {
      setValue("recaptchaToken", token);
      clearErrors("recaptchaToken");
    } else {
      setValue("recaptchaToken", "");
      setError("recaptchaToken", {
        type: "manual",
        message: "Подтвердите что вы не робот",
      });
    }
  };

  const onSubmit = async (data: RegistrationFormData) => {
    if (!data.recaptchaToken) {
      setError("recaptchaToken", {
        type: "manual",
        message: "Подтвердите что вы не робот",
      });
      return;
    }

    dispatch(clearError());
    dispatch(setFormData(data));

    const result = await dispatch(sendPhoneVerification(data));
    if (sendPhoneVerification.fulfilled.match(result)) {
      router.push("/register/verify-code");
    } else {
      captchaRef.current?.reset();
      setValue("recaptchaToken", "");
    }
  };

  // !WARNING
  // !ONLY FOR DEVELOPMENT
  // !DELETE ASAP
  const onSubmitDev = async (data: RegistrationFormData) => {
    dispatch(clearError());
    dispatch(setFormData(data));
    router.push("/register/verify-code");
  };

  return (
    <form
      className="flex-1 h-full max-h-full overflow-y-auto flex flex-col gap-4 px-1 sm:px-0 mt-2 scrollbar-none pb-4 md:pb-12"
      onSubmit={handleSubmit(onSubmitDev)}
    >
      <div>
        <MyInput
          {...register("lastName")}
          placeholder="Фамилия*"
          error={errors.lastName?.message}
        />
      </div>

      <div>
        <MyInput
          {...register("firstName")}
          placeholder="Имя*"
          error={errors.firstName?.message}
        />
      </div>

      <div>
        <MyInput
          {...register("middleName")}
          placeholder="Отчество*"
          error={errors.middleName?.message}
        />
      </div>

      <div>
        <MyInput
          {...register("iin")}
          placeholder="ИИН*"
          error={errors.iin?.message}
        />
      </div>

      <Controller
        name="birthDate"
        control={control}
        render={({ field }) => (
          <DateCalendar
            placeholder="Выберите дату рождения"
            date={field.value ? new Date(field.value) : undefined}
            onDateChange={(date) => {
              field.onChange(date ? date.toISOString().split("T")[0] : "");
            }}
            error={errors.birthDate?.message}
          />
        )}
      />

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

      <div>
        <MyInput
          {...register("email")}
          placeholder="Email"
          type="email"
          error={errors.email?.message}
        />
      </div>

      <div>
        <MyInput
          {...register("password")}
          placeholder="Пароль"
          type={showPass1 ? "text" : "password"}
          error={errors.password?.message}
          rightIcon={
            <span onClick={() => setShowPass1((v) => !v)} tabIndex={-1}>
              {showPass1 ? <EyeClosed size={20} /> : <Eye size={20} />}
            </span>
          }
        />
      </div>

      <MyInput
        {...register("confirmPassword")}
        type={showPass2 ? "text" : "password"}
        error={errors.confirmPassword?.message}
        placeholder="Повторите пароль"
        rightIcon={
          <span onClick={() => setShowPass2((v) => !v)} tabIndex={-1}>
            {showPass2 ? <EyeClosed size={20} /> : <Eye size={20} />}
          </span>
        }
      />

      <div className="w-full flex flex-col gap-3">
        <div className="w-full flex justify-center items-center">
          <GoogleCaptcha
            ref={captchaRef}
            onChange={handleCaptchaChange}
            error={errors.recaptchaToken?.message}
          />
        </div>

        {error && (
          <div className="rounded-md p-4">
            <div className="text-sm text-red-700">{error}</div>
          </div>
        )}
      </div>

      <MyButton
        size="medium"
        type="submit"
        className="w-full"
        disabled={isLoading || !recaptchaToken}
      >
        {isLoading ? "Загрузка..." : "Запросить код подтверждения"}
      </MyButton>
    </form>
  );
};
