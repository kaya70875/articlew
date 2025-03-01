import React from 'react'

export default function CardContainer({ children }: { children: React.ReactNode }) {
    return (
        <div className='card-container'>
            {children}
        </div>
    )
}
