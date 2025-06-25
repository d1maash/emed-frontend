"use client"

import Logo from '@/components/Logo'
import Button from '@/components/myui/Button'
import Input from '@/components/myui/Input'
import Link from 'next/link'
import React, { useState } from 'react'

const Login = () => {

    const [login, setLogin] = useState("")
    const [password, setPassword] = useState("")


    return (
        <>
            <form onSubmit={()=>{}} className=''>
                <Input 
                    placeholder="Логин" type="text" 
                    variant="outline" className='w-full mt-8 md:mt-[3.75rem] px-5 py-6'
                    value={login} onChange={(e) => setLogin(e.target.value)}
                    />
                <Input 
                    placeholder="Пароль" type="password" 
                    variant="outline" className='w-full mt-2 md:mt-5 px-5 py-6'
                    value={password} onChange={(e) => setPassword(e.target.value)}
                    />
                <Button variant="filled" size="large" className='w-full mt-8 md:mt-[3.75rem] py-[22px]'>
                    Войти
                </Button>
            </form>
            <div className='w-full flex flex-col justify-between items-start md:flex-row md:justify-between md:items-center mt-8 md:mt-[3.75rem] pb-10 md:pb-16 lg:pb-[4.5rem]'>
                <p className="button-s text-[--coolgray-50]">
                    Забыли пароль?
                </p>
                <Link href="/register" className='mt-3 md:m-0 button-s text-[--coolgray-50]'>
                    Зарегистрироваться
                </Link>
            </div>
        </>
    )
}

export default Login