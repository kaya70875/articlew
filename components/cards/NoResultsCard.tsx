import Image from 'next/image'
import React from 'react'
import noResults from '@/public/images/no-results.png'

export default function NoResultsCard() {
    return (
        <div className='p-12 rounded-lg w-full flex flex-col items-center justify-center gap-6'>
            <header className='flex flex-col items-center gap-2'>
                <h3>No Results.</h3>
                <p>We are still trying to expand our database. So you can try again later.</p>
            </header>

            <Image src={noResults} alt='no-results' width={300} height={300} />
        </div>
    )
}
