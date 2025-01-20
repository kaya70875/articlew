import React from 'react'

interface EllipseHeaderProps {
    ellipseColor: string;
    text: string;
}

export default function EllipseHeader({ ellipseColor, text }: EllipseHeaderProps) {
    return (
        <header className='text-primaryText font-medium text-lg flex items-center gap-2'>
            <div className={`ellipse ${ellipseColor}`}></div>
            {text}
        </header>
    )
}
