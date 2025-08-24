'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import IconCompare from './svg/IconCompare'
import Dropdown from './Dropdown'
import Profile from './auth/Profile'
import ProfileIcon from './reusables/ProfileIcon'
import { useSession } from 'next-auth/react'
import Logo from './reusables/Logo'
import { CrownIcon, RefreshCwIcon, SearchIcon, StarIcon, WrenchIcon } from 'lucide-react'

export default function Sidebar() {
    const pathname = usePathname();

    const sidebarItems = [
        {
            name: 'Search',
            icon: (<SearchIcon className='w-5 h-5' />),
            route: '/search'
        },
        {
            name: 'Favorites',
            icon: (<StarIcon className='w-5 h-5' />),
            route: '/favorites'
        },
        {
            name: 'Paraphrase',
            icon: (<RefreshCwIcon className='w-5 h-5' />),
            route: '/paraphrase'
        },
        {
            name: 'Fix',
            icon: (<WrenchIcon className='w-5 h-5' />),
            route: '/fix',
        },
        {
            name: 'Compare',
            icon: (<IconCompare />),
            route: '/compare'
        },
    ]

    const { data: session } = useSession();
    const isFree = session?.user.userType === 'Free';

    return (
        <div className={`flex flex-col justify-start z-10 p-3 sm:p-4 gap-8 fixed h-fit md:h-screen bg-white border-r border-gray-200 bottom-0 md:top-0 w-full md:w-fit lg:w-[260px] xl:w-[280px]`}>
            <Logo className='hidden md:flex items-center' />

            <ul className="nav-items flex flex-row md:flex-col justify-center items-center lg:items-start w-full gap-0 md:gap-4">
                {sidebarItems.map((item, index) => (
                    <Link href={item.route} key={index} className={`flex items-center justify-center lg:justify-start w-full flex-col md:flex-row rounded-lg gap-1 lg:gap-3 text-primaryText p-2 ${pathname === item.route ? 'bg-[#EEF2FF]' : ''} hover:bg-gray-200`}>
                        <div className={`icon ${pathname === item.route ? 'text-primaryPurple' : 'text-primaryText'}`}>{item.icon}</div>
                        <p className={`${pathname === item.route ? 'text-primaryPurple font-medium' : ''} hidden sm:block md:hidden lg:block text-sm lg:text-base`}>{item.name}</p>
                    </Link>

                ))}

                {isFree && <Link href={'/premium'} className={`premium-button hidden md:flex items-center gap-3 group mt-4 rounded-full md:rounded-xl`}>
                    <div className="icon">
                        <CrownIcon className='w-5 h-5' />
                    </div>
                    <h5 className='hidden lg:block font-medium group'>Go Premium</h5>
                </Link>}

                <div className='logout-section absolute bottom-24 hidden md:flex items-center gap-3 cursor-pointer'>
                    <Dropdown padding='2rem' position='right' dropdownTitle={
                        <div className='flex items-center gap-2'>
                            <ProfileIcon />
                            <p className='hidden lg:block'>Profile</p>
                        </div>

                    }>
                        <Profile />
                    </Dropdown>
                </div>
            </ul>


        </div>
    )
}