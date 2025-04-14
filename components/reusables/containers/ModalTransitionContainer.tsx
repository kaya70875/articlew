import React from 'react'

export default function ModalTransitionContainer({ modalOpen, children }: { modalOpen: boolean, children: React.ReactNode }) {
    return (
        <div className={`filter-modal transition-all ease duration-150 z-20 ${modalOpen ? 'opacity-100 visible pointer-events-auto' : 'opacity-0 invisible pointer-events-none'}`}>
            {children}
        </div>
    )
}
