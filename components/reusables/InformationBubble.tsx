import React, { useEffect, useRef, useState } from 'react';

interface InformationBubbleProps {
    children: React.ReactNode;
    information: string;
}

export default function InformationBubble({ children, information }: InformationBubbleProps) {

    const [isHovered, setIsHovered] = useState(false);

    return (
        <div className='dropdown-bubble relative flex justify-center group' onMouseOver={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
            {children}

            <div className={`dropdown-menu min-w-0 absolute mt-9 z-20 p-3 rounded-full bg-primaryText transition-opacity ${isHovered ? 'group-hover:opacity-100 group-hover:delay-500' : 'opacity-0 invisible'}`}>
                <p className='text-whitef whitespace-nowrap text-sm'>{information}</p>
            </div>
        </div>
    );
}