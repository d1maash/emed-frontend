import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { token } = await request.json()
    
    if (!token) {
      return NextResponse.json(
        { success: false, error: 'Токен reCAPTCHA не предоставлен' },
        { status: 400 }
      )
    }

    const secretKey = process.env.RECAPTCHA_SECRET_KEY
    
    if (!secretKey) {
      return NextResponse.json(
        { success: false, error: 'Секретный ключ reCAPTCHA не настроен' },
        { status: 500 }
      )
    }

    const verificationURL = 'https://www.google.com/recaptcha/api/siteverify'
    
    const response = await fetch(verificationURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        secret: secretKey,
        response: token,
      }),
    })

    const verificationData = await response.json()
    
    if (verificationData.success) {
      return NextResponse.json({ success: true })
    } else {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Проверка reCAPTCHA не пройдена',
          details: verificationData['error-codes'] 
        },
        { status: 400 }
      )
    }
  } catch (error) {
    console.error('Ошибка проверки reCAPTCHA:', error)
    return NextResponse.json(
      { success: false, error: 'Внутренняя ошибка сервера' },
      { status: 500 }
    )
  }
}
