'use client';

import Link from 'next/link'
import React from 'react'
import { useSession } from 'next-auth/react'
import Profile from './auth/Profile';
import Dropdown from './Dropdown';
import ProfileIcon from './reusables/ProfileIcon';
import Logo from './reusables/Logo';

export default function Navbar() {

    const session = useSession();

    const navItems = ['Features', 'How it Works', 'Pricing'];

    return (
        <div className='w-full fixed top-0 left-0 px-4 md:px-[80px] xl:px-default-padding border-y border-gray-200 z-20 bg-main'>
            <nav className='py-4 w-full flex justify-between items-center'>
                <Logo className='flex items-center' />

                <div className="navigations flex items-center gap-8 text-gray-700 font-medium text-sm">
                    {navItems.map((navItem) => (
                        <a className='cursor-pointer hover:text-primaryPurple transition-all duration-200' href="#">{navItem}</a>
                    ))}
                </div>

                {session.status === 'unauthenticated' ? (
                    <div className='auth-buttons flex items-center gap-6'>
                        <button className="secondary-button">
                            <Link href={'/auth'} >Log In</Link>
                        </button>
                        <button className="primary-button">
                            <Link href={'/auth'}>Get Started</Link>
                        </button>
                    </div>
                ) : (
                    <Dropdown padding='1.5rem' basePosition='right' dropdownTitle={
                        <ProfileIcon />
                    }>
                        <Profile />

                    </Dropdown>
                )}
            </nav>
        </div>
    )
}
