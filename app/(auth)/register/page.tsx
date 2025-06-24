"use client"

import Logo from '@/components/Logo'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import Link from 'next/link'
import React, { useState } from 'react'

const Register = () => {

  const [middlename, setMiddlename] = useState("") // Отчество
  const [firstname, setFirstname] = useState("") // Имя
  const [lastname, setLastname] = useState("") // Фамилия
  const [iin, setIin] = useState("") // ИИН
  const [email, setEmail] = useState("")
  const [oblast, setOblast] = useState("")
  const [pass1, setPass1] = useState("")
  const [pass2, setPass2] = useState("")


  return (

    <div className='max-w-3xl md:min-w-[450px] flex flex-col w-full h-full bg-white pb-2 px-8 pt-10 md:px-16 md:pt-16 lg:px-[5.75rem] lg:pt-[4.5rem] rounded-[50px]'>
      <div className='h-[98px]'>
      <Logo variant="blue" width={337} height={98}/>
      </div>
      <div className='mt-4'>
      <Link href="/login" className='body-l text-[--coolgray-90]'>
        У меня уже есть аккаунт
      </Link>
      </div>
      <form onSubmit={(e) => {
        e.preventDefault();
        }} 
        className='flex-1 overflow-auto pb-14 h-full'
        >
        <Input 
          placeholder="Фамилия*" type="text" 
          variant="outline" className='w-full mt-2 md:mt-[30px] px-5 py-[15px]'
          value={lastname} onChange={(e) => setLastname(e.target.value)}
          />
        <Input 
          placeholder="Имя*" type="text" 
          variant="outline" className='w-full mt-2 md:mt-[30px] px-5 py-[15px]'
          value={firstname} onChange={(e) => setFirstname(e.target.value)}
          />
        <Input 
          placeholder="Отчество*" type="text" 
          variant="outline" className='w-full mt-2 md:mt-[30px] px-5 py-[15px]'
          value={middlename} onChange={(e) => setMiddlename(e.target.value)}
          />
        <Input 
          placeholder="ИИН*" type="text" 
          variant="outline" className='w-full mt-2 md:mt-[30px] px-5 py-[15px]'
          value={iin} onChange={(e) => setIin(e.target.value)}
          />
        {/* 
          TODO: Input Birthday
        */}
        <Input 
          placeholder="Дата рождения*" type="text" 
          variant="outline" className='w-full mt-2 md:mt-[30px] px-5 py-[15px]'
          // value={email} onChange={(e) => setEmail(e.target.value)}
          />
        {/* 
          TODO: Input PhoneNumber
        */}
        <Input 
          placeholder="+7 7__ ___ __ __*" type="text" 
          variant="outline" className='w-full mt-2 md:mt-[30px] px-5 py-[15px]'
          // value={email} onChange={(e) => setEmail(e.target.value)}
          />
        
          
        <Input 
          placeholder="Email" type="email" 
          variant="outline" className='w-full mt-2 md:mt-[30px] px-5 py-[15px]'
          value={email} onChange={(e) => setEmail(e.target.value)}
          />
        <Input 
          placeholder="Область*" type="text" 
          variant="outline" className='w-full mt-2 md:mt-[30px] px-5 py-[15px]'
          value={oblast} onChange={(e) => setOblast(e.target.value)}
          />
        <Input 
          placeholder="Пароль*" type="text" 
          variant="outline" className='w-full mt-2 md:mt-[30px] px-5 py-[15px]'
          value={pass1} onChange={(e) => setPass1(e.target.value)}
          />
        <Input 
          placeholder="Подтвердите пароль*" type="text" 
          variant="outline" className='w-full mt-2 md:mt-[30px] px-5 py-[15px]'
          value={pass2} onChange={(e) => setPass2(e.target.value)}
          />
        

        <Button disabled={!firstname || !lastname || !iin || !pass1 || pass1 !== pass2} variant="filled" size="large" className='w-full mt-8 md:mt-[3.75rem] '>
          Запросить код подтверждения
        </Button>
      </form>
    </div>
  )
}

export default Register