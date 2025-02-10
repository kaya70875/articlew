import Image from 'next/image'
import React from 'react'
import noResultsSvg from '@/public/illustrations/no-results.svg'

export default function NoResultsCard() {
    return (
        <div className='p-12 rounded-lg w-full flex flex-col items-center justify-center gap-12'>
            <header className='flex flex-col items-center gap-2'>
                <h3>No Results.</h3>
                <p className='text-center'>We are still trying to expand our database. So you can try again later.</p>
            </header>

            <Image src={noResultsSvg} alt='no-results' width={300} height={300} />
        </div>
    )
}
