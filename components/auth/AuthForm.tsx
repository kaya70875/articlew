import React from 'react'

interface AuthFormProps {
    header: string;
    desc: string;
    children: React.ReactNode;
}

export default function AuthForm({ header, desc, children }: AuthFormProps) {
    return (
        <form className='bg-white rounded-lg w-2/3 max-w-5xl flex flex-col p-24 gap-16 items-center justify-center'>
            <header className='flex flex-col items-center justify-center gap-4'>
                <h1>{header}</h1>
                <p>{desc}</p>
            </header>
            {children}
        </form>
    )
}
