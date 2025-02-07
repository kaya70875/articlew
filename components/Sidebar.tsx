'use client'

import useScreenSize from '@/hooks/useScreenSize'
import { signOut } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect } from 'react'
import logo from '@/public/images/logo.jpg';
import IconCompare from './svg/IconCompare'

export default function Sidebar() {
    const pathname = usePathname();

    const sidebarItems = [
        {
            name: 'Search',
            icon: (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M20.9999 21L16.6499 16.65" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            ),
            route: '/search'
        },
        {
            name: 'Favorites',
            icon: (<svg width="23" height="22" viewBox="0 0 23 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20.2913 3.50813C19.7805 2.99713 19.1741 2.59177 18.5066 2.31521C17.8392 2.03865 17.1238 1.8963 16.4013 1.8963C15.6788 1.8963 14.9634 2.03865 14.2959 2.31521C13.6285 2.59177 13.022 2.99713 12.5113 3.50813L11.4513 4.56813L10.3913 3.50813C9.3596 2.47643 7.96032 1.89684 6.50129 1.89684C5.04226 1.89684 3.64298 2.47643 2.61129 3.50813C1.5796 4.53982 1 5.93909 1 7.39813C1 8.85716 1.5796 10.2564 2.61129 11.2881L3.67129 12.3481L11.4513 20.1281L19.2313 12.3481L20.2913 11.2881C20.8023 10.7774 21.2076 10.1709 21.4842 9.50348C21.7608 8.83602 21.9031 8.12061 21.9031 7.39813C21.9031 6.67564 21.7608 5.96023 21.4842 5.29277C21.2076 4.62531 20.8023 4.01888 20.2913 3.50813Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            ),
            route: '/favorites'
        },
        {
            name: 'Paraphrase',
            icon: (<svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 16.75C1 16.1533 1.26339 15.581 1.73223 15.159C2.20107 14.7371 2.83696 14.5 3.5 14.5H17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M3.5 1H17V19H3.5C2.83696 19 2.20107 18.7629 1.73223 18.341C1.26339 17.919 1 17.3467 1 16.75V3.25C1 2.65326 1.26339 2.08097 1.73223 1.65901C2.20107 1.23705 2.83696 1 3.5 1Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>

            ),
            route: '/paraphrase'
        },
        {
            name: 'Sentence Fix',
            icon: (<svg width="16" height="21" viewBox="0 0 16 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 19.6889L8 14.6889L1 19.6889V3.6889C1 3.15847 1.21071 2.64976 1.58579 2.27469C1.96086 1.89962 2.46957 1.6889 3 1.6889H13C13.5304 1.6889 14.0391 1.89962 14.4142 2.27469C14.7893 2.64976 15 3.15847 15 3.6889V19.6889Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            ),
            route: '/fix',
        },
        {
            name: 'Compare',
            icon: (<IconCompare />
            ),
            route: '/compare'
        },
    ]

    const { isBelow: isTablet } = useScreenSize(1024);

    return (
        <div className={`flex flex-col justify-start p-6 gap-8 h-screen fixed top-0 bg-white shadow-[2px_0_10px_-2px_rgba(0,0,0,0.1)] ${isTablet ? 'w-[12%]' : 'w-sidebar-width'}`}>

            <div className='logo flex items-center gap-2 cursor-pointer'>
                <Image className='rounded-xl' src={logo} alt="logo" width={48} height={48} />
                <h4 className='text-xl'>articlew</h4>
            </div>

            <ul className="nav-items flex flex-col justify-center items-center lg:items-start w-full gap-8">
                {sidebarItems.map((item, index) => (
                    <Link href={item.route} key={index} className={`flex items-center rounded-full gap-3 text-primaryText group hover:text-primaryBlue`}>
                        <div className={`icon ${pathname === item.route ? 'text-primaryBlue' : ''}`}>{item.icon}</div>
                        {!isTablet && <p className={`font-semibold group-hover:text-inherit ${pathname === item.route ? 'text-primaryBlue' : ''}`}>{item.name}</p>}
                    </Link>

                ))}

                <Link href={'/premium'} className='premium-button flex items-center gap-3 rounded-xl group text-[#3A1D0D]'>
                    <div className="icon"><svg width="14" height="20" viewBox="0 0 16 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8 15C11.866 15 15 11.866 15 8C15 4.13401 11.866 1 8 1C4.13401 1 1 4.13401 1 8C1 11.866 4.13401 15 8 15Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M4.21 13.89L3 23L8 20L13 23L11.79 13.88" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg></div>
                    <h5 className='font-medium group'>Go Premium</h5>
                </Link>

                <div className='logout-section absolute bottom-24 flex items-center gap-3 cursor-pointer' onClick={() => signOut()}>
                    <div className='bg-blue-300 flex items-center justify-center p-4 w-12 h-12 rounded-full'>
                        <p className='text-sm'>A</p>
                    </div>

                    {!isTablet && <p className='font-semibold'>Log Out</p>}
                </div>
            </ul>


        </div>
    )
}