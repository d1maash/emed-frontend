// src/components/registration/VerificationForm.tsx
'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { verificationSchema, VerificationFormData } from '@/schemas/registrationSchema'
import { verifyPhoneCode, sendPhoneVerification, clearError } from '@/store/slices/registrationSlice'
import { RootState, AppDispatch } from '@/store'
import MyInput from '@/components/myui/MyInput'
import MyButton from '@/components/myui/MyButton'

export const VerificationForm: React.FC = () => {
  const router = useRouter()
  const dispatch = useDispatch<AppDispatch>()
  const { isLoading, error, phoneNumber, formData, verificationAttempts } = useSelector(
    (state: RootState) => state.registration
  )
  
  const [timeLeft, setTimeLeft] = useState(60)
  const [canResend, setCanResend] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<VerificationFormData>({
    resolver: zodResolver(verificationSchema)
  })

  useEffect(() => {
    if (!formData) {
      router.push('/registration')
      return
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setCanResend(true)
          clearInterval(timer)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [formData, router])

  const onSubmit = async (data: VerificationFormData) => {
    dispatch(clearError())
    
    const result = await dispatch(verifyPhoneCode({
      phone: phoneNumber,
      code: data.code
    }))
    
    if (verifyPhoneCode.fulfilled.match(result)) {
      // Redirect to success page or login
      router.push('/login?registered=true')
    }
  }

  const handleResendCode = async () => {
    if (!canResend || !formData) return
    
    dispatch(clearError())
    const result = await dispatch(sendPhoneVerification(formData))
    
    if (sendPhoneVerification.fulfilled.match(result)) {
      setTimeLeft(60)
      setCanResend(false)
    }
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  if (!formData) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Подтверждение телефона
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Введите 6-значный код, отправленный на номер
        </p>
        <p className="text-center text-sm font-medium text-gray-900">
          {phoneNumber}
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <MyInput
              {...register('code')}
              error={errors.code?.message}
              placeholder="Введите 6-значный код"
              maxLength={6}
              className="text-center text-2xl tracking-widest"
            />

            {error && (
              <div className="rounded-md bg-red-50 p-4">
                <div className="text-sm text-red-700">{error}</div>
                {verificationAttempts >= 3 && (
                  <div className="text-sm text-red-600 mt-1">
                    Превышено количество попыток. Попробуйте позже.
                  </div>
                )}
              </div>
            )}

            <div className="flex items-center justify-between">
              <div className="text-sm">
                {!canResend ? (
                  <span className="text-gray-500">
                    Повторная отправка через {formatTime(timeLeft)}
                  </span>
                ) : (
                  <button
                    type="button"
                    onClick={handleResendCode}
                    className="text-blue-600 hover:text-blue-500"
                    disabled={isLoading}
                  >
                    Отправить код повторно
                  </button>
                )}
              </div>
            </div>
              <MyButton
                type="submit"
                className="flex-1"
                disabled={isLoading || verificationAttempts >= 3}
              >
                Подтвердить
              </MyButton>
          </form>
        </div>
      </div>
    </div>
  )
}
