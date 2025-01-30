import React from 'react';

interface InformationBubbleProps {
    children: React.ReactNode;
    information: string;
}

export default function InformationBubble({ children, information }: InformationBubbleProps) {
    return (
        <div className='dropdown-bubble relative flex justify-center group'>
            {children}

            <div className='dropdown-menu min-w-0 absolute mt-9 z-20 p-3 rounded-full bg-primaryText opacity-0 transition-opacity group-hover:opacity-100 group-hover:delay-500'>
                <p className='text-whitef whitespace-nowrap text-sm'>{information}</p>
            </div>
        </div>
    );
}