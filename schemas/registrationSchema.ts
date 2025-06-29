import { z } from "zod";

const iinRegex = /^\d{12}$/;
const phoneRegex =
  /^(\+7|7)[\s\-]?(\()?[0-9]{3}(\))?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/;
const nameRegex = /^[а-яёА-ЯЁa-zA-ZӘәҒғҚқҢңӨөҰұҮүҺһІі\s-]+$/;

export const registrationSchema = z
  .object({
    lastName: z
      .string()
      .min(1, "Фамилия обязательна")
      .max(50, "Фамилия не должна превышать 50 символов")
      .regex(nameRegex, "Фамилия должна содержать только буквы"),

    firstName: z
      .string()
      .min(1, "Имя обязательно")
      .max(50, "Имя не должно превышать 50 символов")
      .regex(nameRegex, "Имя должно содержать только буквы"),

    middleName: z
      .string()
      .min(1, "Отчество обязательно")
      .max(50, "Отчество не должно превышать 50 символов")
      .regex(nameRegex, "Отчество должно содержать только буквы"),

    iin: z.string().regex(iinRegex, "ИИН должен содержать 12 цифр"),

    birthDate: z
      .string()
      .min(1, "Дата рождения обязательна")
      .refine((date) => {
        const birthDate = new Date(date);
        const today = new Date();
        const age = today.getFullYear() - birthDate.getFullYear();
        return age >= 18 && age <= 120;
      }, "Возраст должен быть от 18 до 120 лет"),

    phone: z.string().regex(phoneRegex, "Неполный номер телефона"),

    email: z
      .string()
      .email("Некорректный email адрес")
      .min(1, "Email обязателен"),

    password: z
      .string()
      .min(8, "Пароль должен содержать минимум 8 символов")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        "Пароль должен содержать строчную и заглавную буквы, цифру"
      ),

    confirmPassword: z.string().min(1, "Подтверждение пароля обязательно"),

    recaptchaToken: z.string().min(1, "Подтвердите что вы не робот"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Пароли не совпадают",
    path: ["confirmPassword"],
  });

export const verificationSchema = z.object({
  code: z
    .string()
    .length(6, "Код должен содержать 6 цифр")
    .regex(/^\d{6}$/, "Код должен содержать только цифры"),
});

export type RegistrationFormData = z.infer<typeof registrationSchema>;
export type VerificationFormData = z.infer<typeof verificationSchema>;
