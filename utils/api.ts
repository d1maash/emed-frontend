import axios from 'axios'
import { RegistrationData, VerificationData, RecaptchaVerificationResponse } from '@/types/registration'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

export const verifyRecaptcha = async (token: string): Promise<RecaptchaVerificationResponse> => {
  const response = await fetch('/api/verify-recaptcha', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ token }),
  })
  
  if (!response.ok) {
    throw new Error('Ошибка проверки reCAPTCHA')
  }
  
  return response.json()
}

export const sendVerificationCode = async (data: RegistrationData) => {
  // Сначала проверяем reCAPTCHA
  const recaptchaResult = await verifyRecaptcha(data.recaptchaToken)
  if (!recaptchaResult.success) {
    throw new Error('Ошибка проверки reCAPTCHA')
  }
  
  return api.post('/auth/send-verification', data)
}

export const verifyCode = async (data: VerificationData) => {
  return api.post('/auth/verify-code', data)
}
