'use client'

import useScreenSize from '@/hooks/useScreenSize'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import logo from '@/public/images/logo.jpg';
import IconCompare from './svg/IconCompare'
import IconSearch from './svg/IconSearch'
import IconFavorites from './svg/IconFavorites'
import IconParaphrase from './svg/IconParaphrase'
import IconFix from './svg/IconFix'
import Dropdown from './Dropdown'
import Profile from './auth/Profile'
import ProfileIcon from './reusables/ProfileIcon'

export default function Sidebar() {
    const pathname = usePathname();

    const sidebarItems = [
        {
            name: 'Search',
            icon: (<IconSearch />),
            route: '/search'
        },
        {
            name: 'Favorites',
            icon: (<IconFavorites />),
            route: '/favorites'
        },
        {
            name: 'Paraphrase',
            icon: (<IconParaphrase />),
            route: '/paraphrase'
        },
        {
            name: 'Fix',
            icon: (<IconFix />),
            route: '/fix',
        },
        {
            name: 'Compare',
            icon: (<IconCompare />),
            route: '/compare'
        },
    ]

    const { isBelow: isTablet } = useScreenSize(1024);
    const { isBelow: isMobile } = useScreenSize(768);

    return (
        <div className={`${isMobile ? 'w-full bottom-0' : 'h-screen top-0'} ${isTablet ? 'w-[12%] items-center' : 'w-sidebar-width items-start'} flex flex-col justify-start z-10 p-3 sm:p-6 gap-8 fixed bg-white shadow-[2px_0_10px_-2px_rgba(0,0,0,0.1)]`}>
            <div className='logo hidden md:flex items-center gap-2 cursor-pointer'>
                <Image className='rounded-xl' src={logo} alt="logo" width={48} height={48} />
                <h4 className='text-xl hidden lg:block'>articlew</h4>
            </div>

            <ul className="nav-items flex flex-row md:flex-col justify-center items-center lg:items-start w-full gap-0 md:gap-8">
                {sidebarItems.map((item, index) => (
                    <Link href={item.route} key={index} className={`flex items-center justify-center lg:justify-start w-full flex-col md:flex-row rounded-full gap-1 lg:gap-3 text-primaryText group hover:text-primaryBlue`}>
                        <div className={`icon ${pathname === item.route ? 'text-primaryBlue' : ''}`}>{item.icon}</div>
                        <p className={`font-semibold group-hover:text-inherit ${pathname === item.route ? 'text-primaryBlue' : ''} hidden sm:block md:hidden lg:block text-sm lg:text-base`}>{item.name}</p>
                    </Link>

                ))}

                <Link href={'/premium'} className={`premium-button hidden md:flex items-center gap-3 group mt-4 rounded-full md:rounded-xl`}>
                    <div className="icon"><svg width="14" height="20" viewBox="0 0 16 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8 15C11.866 15 15 11.866 15 8C15 4.13401 11.866 1 8 1C4.13401 1 1 4.13401 1 8C1 11.866 4.13401 15 8 15Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M4.21 13.89L3 23L8 20L13 23L11.79 13.88" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg></div>
                    <h5 className='hidden lg:block font-medium group'>Go Premium</h5>
                </Link>

                <div className='logout-section absolute bottom-24 hidden md:flex items-center gap-3 cursor-pointer'>
                    <Dropdown padding='2rem' position='right' dropdownTitle={
                        <div className='flex items-center gap-2'>
                            <ProfileIcon />
                            <p className='hidden lg:block font-semibold'>Profile</p>
                        </div>

                    }>
                        <Profile />
                    </Dropdown>
                </div>
            </ul>


        </div>
    )
}