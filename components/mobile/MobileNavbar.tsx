'use client';

import Image from 'next/image'
import React from 'react'
import logo from '@/public/images/logo.jpg'
import Link from 'next/link'
import { signOut } from 'next-auth/react'

export default function MobileNavbar() {
    return (
        <div className='w-full h-16 bg-main rounded-xl shadow-lg z-10 p-4 flex items-center justify-between'>
            <div className="logo">
                <Image className='rounded-xl' src={logo} width={40} height={40} alt='logo' />
            </div>

            <div className='flex items-center gap-4'>
                <Link href={'/premium'} className={`premium-button group w-10 h-10 p-4 flex items-center justify-center !rounded-full`}>
                    <div className="icon"><svg width="14" height="20" viewBox="0 0 16 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8 15C11.866 15 15 11.866 15 8C15 4.13401 11.866 1 8 1C4.13401 1 1 4.13401 1 8C1 11.866 4.13401 15 8 15Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M4.21 13.89L3 23L8 20L13 23L11.79 13.88" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg></div>
                    <h5 className='hidden lg:block font-medium group'>Go Premium</h5>
                </Link>

                <div className='cursor-pointer' onClick={() => signOut()}>
                    <div className='bg-blue-300 flex items-center justify-center p-4 w-10 h-10 rounded-full'>
                        <p className='text-sm'>AK</p>
                    </div>

                    <p className='font-semibold hidden md:block'>Log Out</p>
                </div>
            </div>
        </div>
    )
}
