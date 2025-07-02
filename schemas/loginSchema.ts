import { z } from "zod";

const iinRegex = /^\d{12}$/;
const phoneRegex =
  /^(\+7|7)[\s\-]?(\()?[0-9]{3}(\))?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/;
const nameRegex = /^[а-яёА-ЯЁa-zA-ZӘәҒғҚқҢңӨөҰұҮүҺһІі\s-]+$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).+$/;

export const loginSchema = z.object({
  iin: z
    .string()
    .min(1, "ИИН обязателен")
    .regex(iinRegex, "ИИН должен состоять из 12 цифр"),
  password: z.string().min(1, "Пароль обязателен"),
});

export type LoginFormData = z.infer<typeof loginSchema>;
