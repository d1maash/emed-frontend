"use client"

import Logo from '@/components/Logo'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Login = () => {
  return (
    <div className='max-w-3xl w-full bg-white px-16 py-16 lg:px-[5.75rem] lg:py-[4.5rem] rounded-[50px]'>
        <Logo variant="blue" width={337} height={98}/>
        <form onSubmit={()=>{}}>
            <Input placeholder="Логин" type="text" variant="outline" className='w-full mt-[3.75rem] px-5 py-6'/>
            <Input placeholder="Пароль" type="password" variant="outline" className='w-full mt-5 px-5 py-6'/>
            <Button variant="filled" size="large" className='w-full mt-[3.75rem] py-[22px]'>
                Войти
            </Button>
        </form>
        <div className='w-full flex justify-between items-center mt-[3.75rem]'>
            <p className="button-s text-[--primary-60]">
                Забыли пароль?
            </p>
            <Link href="/register">
                <Button type="button" variant="link" size="small">
                    Зарегистрироваться
                </Button>
            </Link>
        </div>
    </div>
  )
}

export default Login