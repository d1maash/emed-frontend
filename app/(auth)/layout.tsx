import Logo from '@/components/Logo';
import React from 'react'

const AuthLayout = ({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) => {
  return (
    <div className=' 
    w-full h-[100dvh] md:h-screen bg-[var(--primary-90)]
    grid grid-cols-1 lg:grid-cols-2 
    gap-40 py-4 px-8 md:py-8 md:px-16 lg:mx-auto lg:px-28 
    '>
      <div className='hidden lg:flex justify-center items-center relative'>
        {/* Decoration block */}
        <img src="/illustrations/login-decoration-group.svg" alt="decoration photo" className='absolute w-full h-full'/>
      </div>
      <div className='flex min-h-full justify-center items-center'>
        <div className='max-w-3xl md:min-w-[450px] flex flex-col w-full max-h-full bg-white pb-2 px-8 pt-10 md:px-16 md:pt-16 lg:px-[5.75rem] lg:pt-[4.5rem] rounded-[50px] overflow-auto'>
          <Logo variant="blue" width={337} height={98}/>

          {children}
        </div>        
      </div>
    </div>
  )
}

export default AuthLayout