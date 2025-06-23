import React from 'react'

const AuthLayout = ({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) => {
  return (
    <div className='bg-[var(--primary-90)] grid grid-cols-1 lg:grid-cols-2 gap-40 py-16 px-28 w-full'>
      <div className='hidden lg:flex justify-center items-center relative'>
        {/* Decoration block */}
        <img src="/illustrations/doctor2.svg" alt="doctor photo" className='w-full absolute -top-12 left-0 max-w-[257px] opacity-50'/>
        <img src="/illustrations/icon.svg" alt="icon photo" className='w-full absolute -top-14 right-32 max-w-[192px] opacity-[37%]'/>
        <img src="/illustrations/table.svg" alt="table photo" className='w-full absolute bottom-0 left-0 max-w-[243px] opacity-[11%]'/>
        <img src="/illustrations/icon.svg" alt="icon photo" className='w-full absolute bottom-24 right-0 max-w-[158px] opacity-[37%]'/>
        <img src="/illustrations/boy2.svg" alt="boy photo" className='w-full max-w-[474px] relative z-10'/>
        <img src="/illustrations/table.svg" alt="table photo" className='w-full absolute top-100 right-40 max-w-[147px] opacity-[28%]'/>
        </div>
      <div className='flex justify-center items-center h-[calc(100vh-8rem)]'>
        {children}
      </div>
    </div>
  )
}

export default AuthLayout