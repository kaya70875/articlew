import { CircleAlert } from 'lucide-react'
import React from 'react'

export default function AuthFormError({ errorMessage }: { errorMessage: string | null }) {
    return (
        errorMessage && (
            <div className='p-2 w-full bg-red-100 rounded-md flex items-center gap-2'>
                <CircleAlert className='text-red-500 w-5 h-5' />
                <p className='text-red-500'>{errorMessage}</p>
            </div>
        )
    )
}
