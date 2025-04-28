'use client';

import React from 'react'
import Link from 'next/link'
import Dropdown from '../Dropdown';
import Profile from '../auth/Profile';
import ProfileIcon from '../reusables/ProfileIcon';
import Logo from '../reusables/Logo';

export default function MobileNavbar() {

    return (
        <div className=' w-full h-16 p-4 flex items-center justify-between'>
            <Logo />

            <div className='flex items-center gap-4'>
                <Link href={'/premium'} className={`premium-button group w-10 h-10 p-4 flex items-center justify-center !rounded-full`}>
                    <div className="icon"><svg width="14" height="20" viewBox="0 0 16 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8 15C11.866 15 15 11.866 15 8C15 4.13401 11.866 1 8 1C4.13401 1 1 4.13401 1 8C1 11.866 4.13401 15 8 15Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M4.21 13.89L3 23L8 20L13 23L11.79 13.88" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg></div>
                    <h5 className='hidden lg:block font-medium group'>Go Premium</h5>
                </Link>

                <Dropdown basePosition='right' dropdownTitle={
                    <div className='flex items-center gap-2'>
                        <ProfileIcon />
                        <p className='hidden lg:block font-semibold'>Profile</p>
                    </div>
                } >
                    <Profile />
                </Dropdown>
            </div>
        </div>
    )
}
