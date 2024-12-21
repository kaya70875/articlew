import Link from 'next/link'
import React from 'react'

export default function Navbar() {
    return (
        <div className='w-full fixed top-0 left-0 px-default-padding shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)] z-50 bg-main'>
            <nav className='py-8 w-full flex justify-between items-center'>
                <div className="logo">
                    <h2 className='text-primaryText font-semibold text-2xl'>Learn With Articles</h2>
                </div>
                <div className='auth-buttons flex items-center gap-6'>
                    <button className="secondary-button">
                        <Link href={'/login'} >Log In</Link>
                    </button>
                    <button className="primary-button">
                        <Link href={'signup'}>Sign Up</Link>
                    </button>
                </div>
            </nav>
        </div>
    )
}
