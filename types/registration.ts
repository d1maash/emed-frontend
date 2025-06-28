// src/types/registration.ts
export interface RegistrationData {
  lastName: string
  firstName: string
  middleName: string
  iin: string
  birthDate: string
  phone: string
  email?: string
  password: string
  confirmPassword: string
  recaptchaToken: string
}

export interface VerificationData {
  phone: string
  code: string
}

export interface RecaptchaVerificationResponse {
  success: boolean
  challenge_ts?: string
  hostname?: string
  'error-codes'?: string[]
}
