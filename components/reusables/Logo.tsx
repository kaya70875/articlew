import Image from 'next/image'
import React from 'react'
import logo from '@/public/images/logo.svg';
import Link from 'next/link';

interface LogoProps {
    className?: string;
    textColor?: string;
}

export default function Logo({ className, textColor = 'text-primaryColor' }: LogoProps) {
    return (
        <Link href={'/'} className={`${className} cursor-pointer`}>
            <Image src={logo} width={48} height={48} alt='logo' />
            <p className={`${textColor} font-bold hidden lg:block text-xl`}>learnwitharticles</p>
        </Link>
    )
}
