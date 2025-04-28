import Image from 'next/image'
import React from 'react'
import logo from '@/public/images/logo.svg';

interface LogoProps {
    className?: string;
    textColor?: string;
}

export default function Logo({ className, textColor = 'text-primaryColor' }: LogoProps) {
    return (
        <div className={className}>
            <Image src={logo} width={48} height={48} alt='logo' />
            <p className={`${textColor} font-bold hidden lg:block`}>learnwitharticles</p>
        </div>
    )
}
