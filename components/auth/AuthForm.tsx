import React from 'react'

interface AuthFormProps {
    header: string;
    desc: string;
    children: React.ReactNode;
}

export default function AuthForm({ header, desc, children }: AuthFormProps) {
    return (
        <div className='bg-white rounded-xl w-full xl:w-2/3 max-w-5xl flex flex-col p-6 md:p-24 gap-4 md:gap-16'>
            <header className='flex flex-col items-center justify-center gap-4'>
                <h2 className='text-center'>{header}</h2>
                <p className='text-center'>{desc}</p>
            </header>
            {children}
        </div>
    )
}
