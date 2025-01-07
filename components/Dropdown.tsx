import { JSX } from '@emotion/react/jsx-runtime';
import React, { useState } from 'react'

interface DropdownProps {
    dropdownTitle?: string | JSX.Element;
    addButton?: boolean;
    position?: 'left' | 'right';
    handleNewCategoryClick?: () => void;
    children: React.ReactNode;
}

export default function Dropdown({ dropdownTitle = 'Dropdown', addButton = false, handleNewCategoryClick, children, position = 'left' }: DropdownProps) {

    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className='dropdown relative'>
            <button className='relative z-10' onClick={() => setIsOpen(prev => !prev)}>{dropdownTitle}</button>
            <div
                className={`dropdown-menu absolute top-full mt-2 p-4 bg-slate-200 rounded-md ${position === 'left' ? 'left-0' : 'right-0'
                    } ${isOpen ? 'block' : 'hidden'}`}
                style={{ minWidth: 'max-content' }}
            >
                <ul className='flex flex-col gap-4 w-full'>
                    {
                        addButton && <li onClick={handleNewCategoryClick}>
                            <p className='text-base font-semibold cursor-pointer'>+ Add New Category</p>
                            <div className="line !w-full mt-2"></div>
                        </li>
                    }
                    {children}
                </ul>
            </div>

        </div>
    )
}
