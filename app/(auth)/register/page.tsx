"use client"

import Link from 'next/link'
import { RegistrationForm } from './_components/RegistrationForm'

const Register = () => {

  return (
      <>
      <div className='mt-4'>
        <Link href="/login" className='body-l text-[--coolgray-90]'>
          У меня уже есть аккаунт
        </Link>
      </div>
      <RegistrationForm/>
      </>
  )
}

export default Register