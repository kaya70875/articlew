'use client';

import Loading from '@/components/Loading'
import React from 'react'

export default function loading() {
    return (
        <div className='w-full h-full flex items-center justify-center'>
            <Loading />
        </div>
    )
}
