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
    gap-40 py-4 px-8 md:py-8 md:px-16 lg:py-16 lg:px-28 
    '>
      <div className='hidden lg:flex justify-center items-center relative lg:-my-8 lg:-mx-14'>
        {/* Decoration block */}
        <img src="/illustrations/login-decoration-group.svg" alt="decoration photo" className='absolute w-full h-full'/>
      </div>
      <div className='flex min-h-full justify-center items-center'>
        {children}
      </div>
    </div>
  )
}

export default AuthLayout