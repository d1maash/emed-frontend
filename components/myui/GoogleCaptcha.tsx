'use client'

import React, { useRef, forwardRef, useImperativeHandle } from 'react'
import ReCAPTCHA from 'react-google-recaptcha'

interface GoogleCaptchaProps {
  onChange: (token: string | null) => void
  error?: string
  theme?: 'light' | 'dark'
}

export interface GoogleCaptchaRef {
  reset: () => void
  execute: () => void
}

export const GoogleCaptcha = forwardRef<GoogleCaptchaRef, GoogleCaptchaProps>(
  ({ onChange, error, theme = 'light' }, ref) => {
    const recaptchaRef = useRef<ReCAPTCHA>(null)

    useImperativeHandle(ref, () => ({
      reset: () => {
        recaptchaRef.current?.reset()
      },
      execute: () => {
        recaptchaRef.current?.execute()
      }
    }))

    const handleChange = (token: string | null) => {
      onChange(token)
    }

    const handleExpired = () => {
      onChange(null)
    }

    const handleError = () => {
      onChange(null)
    }

    return (
        <div className="flex flex-col w-full h-max">
          <ReCAPTCHA
            ref={recaptchaRef}
            sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
            onChange={handleChange}
            onExpired={handleExpired}
            onError={handleError}
            theme={theme}
            size="normal"
            className='w-full h-full'
          />
          
          {error && (
            <p className="body-sm text-(--error)">{error}</p>
          )}
        </div>
    )
  }
)

GoogleCaptcha.displayName = 'GoogleCaptcha'
