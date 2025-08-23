import React from 'react'
import SignupFeatures from './SignupFeatures';
import Link from 'next/link';
import Image from 'next/image';
import logo from '@/public/images/logo.svg'

interface AuthHeroProps {
    title: string;
    desc: string;
    featuresSection?: boolean;
}

export default function AuthHero({ title, desc, featuresSection }: AuthHeroProps) {
    return (
        <div className="flex flex-col space-y-4">
            <div className="logo">
                <Link href={'/'} className='flex items-center'>
                    <Image src={logo} width={32} height={32} alt='logo' />
                    <span className='font-bold text-lg text-primaryPurple'>Learnwitharticles</span>
                </Link>
            </div>
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl text-gray-900">
                {title}
            </h2>
            <p className="text-lg text-gray-600 max-w-md">
                {desc}
            </p>
            {featuresSection && (
                <SignupFeatures />
            )}

        </div>
    )
}
