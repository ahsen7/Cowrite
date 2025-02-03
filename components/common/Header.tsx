import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'


const Header = ({children, className}: HeaderProps) => {
  return (
    <div className={cn("header", className)}>
        <Link href='/' className='md:flex-1'>
        <Image
        src='/assets/icons/mylogo.svg'
        alt='logo'
        width={100}
        height={22}
        className='hidden md:block'
        />

        </Link>
        {children}
        </div>
  )
}

export default Header