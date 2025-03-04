'use client';

import { useCurrentUser } from '@/utils/helpers'
import Link from 'next/link';
import React from 'react'
import IconAccount from '../svg/IconAccount';
import IconSignout from '../svg/IconSignout';
import { signOut } from 'next-auth/react';

export default function Profile() {

    const currentUser = useCurrentUser();

    return (
        <div className='flex flex-col gap-8'>
            <header className="profile cursor-default flex flex-col items-center gap-1">
                <p>{currentUser?.name}</p>
                <p>{currentUser?.email}</p>
            </header>

            <div className="items flex flex-col gap-4">
                <Link target='_blank' href={'/account'} className='text-primaryText flex items-center gap-3 hover:opacity-80 cursor-pointer'>
                    <IconAccount />
                    <p data-dropdown-clickable>Account</p>
                </Link>
                <li className='text-primaryText flex items-center gap-3 hover:opacity-80 cursor-pointer' onClick={() => signOut()}>
                    <IconSignout />
                    <p data-dropdown-clickable >Sign Out</p>
                </li>
            </div>
        </div>
    )
}
