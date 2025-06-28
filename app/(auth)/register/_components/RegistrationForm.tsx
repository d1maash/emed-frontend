// src/components/register/RegistrationForm.tsx
'use client'

import React, { useRef } from 'react'
import { useRouter } from 'next/navigation'
import { useDispatch, useSelector } from 'react-redux'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { registrationSchema, RegistrationFormData } from '@/schemas/registrationSchema'
import { setFormData, sendPhoneVerification, clearError } from '@/store/slices/registrationSlice'
import { RootState, AppDispatch } from '@/store'
import Input from '@/components/myui/MyInput'
import { GoogleCaptcha, GoogleCaptchaRef } from '@/components/myui/GoogleCaptcha'
import Calendar29 from '@/components/calendar-29'
import BirthdateCalendar from '@/components/myui/BirthdateCalendar'
import MyButton from '@/components/myui/MyButton'

export const RegistrationForm: React.FC = () => {
  const router = useRouter()
  const dispatch = useDispatch<AppDispatch>()
  const { isLoading, error } = useSelector((state: RootState) => state.registration)
  const captchaRef = useRef<GoogleCaptchaRef>(null)

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    control,
    setError,
    clearErrors,
    formState: { errors }
  } = useForm<RegistrationFormData>({
    resolver: zodResolver(registrationSchema)
  })

  const recaptchaToken = watch('recaptchaToken')

  const handleCaptchaChange = (token: string | null) => {
    if (token) {
      setValue('recaptchaToken', token)
      clearErrors('recaptchaToken')
    } else {
      setValue('recaptchaToken', '')
      setError('recaptchaToken', {
        type: 'manual',
        message: 'Подтвердите что вы не робот'
      })
    }
  }

  const onSubmit = async (data: RegistrationFormData) => {
    if (!data.recaptchaToken) {
      setError('recaptchaToken', {
        type: 'manual',
        message: 'Подтвердите что вы не робот'
      })
      return
    }

    dispatch(clearError())
    dispatch(setFormData(data))
    
    const result = await dispatch(sendPhoneVerification(data))
    if (sendPhoneVerification.fulfilled.match(result)) {
      router.push('/registration/verify-code')
    } else {
      captchaRef.current?.reset()
      setValue('recaptchaToken', '')
    }
  }

  // WARNING
  // ONLY FOR DEVELOPMENT
  // 
  const onSubmitDev = async (data: RegistrationFormData) => {
    dispatch(clearError())
    dispatch(setFormData(data))
    router.push('/registration/verify-code')
  }


  return (
          <form 
          className="flex-1 pt-4 pb-14 h-full overflow-auto" 
          onSubmit={handleSubmit(onSubmitDev)}
          >
                <Input
                  placeholder="Фамилия*"
                  {...register('lastName')}
                  error={errors.lastName?.message}
                  variant="outline" className='w-full mt-2 md:mt-[30px] px-5 py-[15px]'
                />
                
                <Input
                  placeholder="Имя*"
                  {...register('firstName')}
                  error={errors.firstName?.message}
                  variant="outline" className='w-full mt-2 md:mt-[30px] px-5 py-[15px]'
                />
                
                <Input
                  placeholder="Отчество*"
                  {...register('middleName')}
                  error={errors.middleName?.message}
                  variant="outline" className='w-full mt-2 md:mt-[30px] px-5 py-[15px]'
                />

                <Input
                  {...register('iin')}
                  error={errors.iin?.message}
                  placeholder="ИИН*"
                  maxLength={12}
                  variant="outline" className='w-full mt-2 md:mt-[30px] px-5 py-[15px]'
                />

                <Controller
                  name="birthDate"
                  control={control}
                  render={({ field }) => (
                    <BirthdateCalendar
                      placeholder="Выберите дату рождения"
                      date={field.value ? new Date(field.value) : undefined}
                      onDateChange={(date) => {
                        field.onChange(date ? date.toISOString().split('T')[0] : '')
                      }}
                      error={errors.birthDate?.message}
                      isRequired
                    />
                  )}
                />

                <Input
                  {...register('phone')}
                  type="tel"
                  error={errors.phone?.message}
                  placeholder="+7 7__ ___ __ __*"
                  variant="outline" className='w-full mt-2 md:mt-[30px] px-5 py-[15px]'
                />

                <Input
                  {...register('email')}
                  type="email"
                  error={errors.email?.message}
                  placeholder="Email"
                  variant="outline" className='w-full mt-2 md:mt-[30px] px-5 py-[15px]'
                />

                <Input
                  {...register('password')}
                  type="password"
                  placeholder="Пароль"
                  variant="outline" className='w-full mt-2 md:mt-[30px] px-5 py-[15px]'
                />

                <Input
                  {...register('confirmPassword')}
                  type="password"
                  error={errors.confirmPassword?.message}
                  placeholder="Повторите пароль"
                  variant="outline" className='w-full mt-2 md:mt-[30px] px-5 py-[15px]'
                />
            <div className="w-full mt-2 md:mt-[30px] px-5 py-[15px]">
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

            <MyButton
              size="medium"
              type="submit"
              className="w-full"
              disabled={isLoading || !recaptchaToken}
            >
              Запросить код подтверждения
            </MyButton>
          </form>
  )
}
