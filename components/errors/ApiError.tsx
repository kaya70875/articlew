import React from 'react'

type ApiError = {
    errorMessage?: string;
    error: string;
}

export default function ApiError({ errorMessage, error }: ApiError) {
    console.log(error);
    const is404 = error?.includes('404');

    if (is404) return;

    return (
        <div className='flex flex-col gap-4 border border-red-500 p-4 rounded-xl'>
            <p className='text-red-500'>{errorMessage}</p>
        </div>
    )
}