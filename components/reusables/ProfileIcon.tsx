'use client';

import { useCurrentUser } from '@/utils/helpers'
import React from 'react'

export default function ProfileIcon() {

    const currentUser = useCurrentUser();

    return (
        <div className='bg-blue-300 flex items-center justify-center p-4 w-11 h-11 rounded-full'>
            <p className='text-sm'>{currentUser?.name?.charAt(0)}</p>
        </div>
    )
}
