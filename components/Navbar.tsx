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

    return (
        <div className='w-full fixed top-0 left-0 px-4 md:px-[80px] xl:px-default-padding shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)] z-20 bg-main'>
            <nav className='py-4 w-full flex justify-between items-center'>
                <Logo className='flex items-center' />
                {session.status === 'unauthenticated' ? (
                    <div className='auth-buttons flex items-center gap-6'>
                        <button className="secondary-button">
                            <Link href={'/login'} >Log In</Link>
                        </button>
                        <button className="primary-button">
                            <Link href={'signup'}>Sign Up</Link>
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
