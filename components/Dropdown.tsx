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
            <button onClick={() => setIsOpen(prev => !prev)}>{dropdownTitle}</button>
            <div className={`dropdown-menu absolute top-8 p-4 bg-slate-600 ${position === 'left' ? 'left-0' : 'right-0'} ${isOpen ? 'block' : 'hidden'}`} style={{
                minWidth: 'max-content'
            }}>
                <ul className='flex flex-col gap-4 w-full'>
                    {
                        addButton && <li onClick={handleNewCategoryClick}>
                            <p className='text-base'>+ Add New Category</p>
                        </li>
                    }
                    {children}
                </ul>
            </div>

        </div>
    )
}
