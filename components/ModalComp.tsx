import React from 'react'
import Iconx from './svg/Iconx';

interface ModalCompProps {
    onClose: () => void;
    modalTitle?: string;
    createNewCategory?: () => void; // Creates a new field for a new category.
    buttonTitle?: string;
    children?: React.ReactNode;
}

export default function ModalComp({ onClose, modalTitle, createNewCategory, buttonTitle, children }: ModalCompProps) {
    return (
        <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50]'>
            <div className='bg-main flex flex-col gap-4 p-12 rounded-lg w-full md:w-[75%] lg:w-1/2 2xl:w-1/3 z-50]'>
                <header className="modal-header flex flex-col gap-4">
                    <div className='flex items-center justify-between w-full'>
                        <h3>{modalTitle}</h3>
                        <Iconx props={{ onClick: onClose, className: 'cursor-pointer text-primaryText hover:opacity-80 transition-all duration-150 ease' }} />
                    </div>
                </header>

                {children}

                <button className="primary-button active:opacity-90" onClick={createNewCategory}>{buttonTitle}</button>
            </div>
        </div>
    )
}
