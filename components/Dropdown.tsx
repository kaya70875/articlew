/** @jsxImportSource @emotion/react */
import useClickOutside from '@/hooks/useClickOutside';
import { css } from '@emotion/react';
import { JSX } from '@emotion/react/jsx-runtime';
import React, { useRef, useState } from 'react'

interface DropdownProps extends React.HTMLAttributes<HTMLDivElement> {
    dropdownTitle?: string | JSX.Element;
    addButton?: boolean;
    position?: 'right' | 'bottom';
    basePosition?: 'right' | 'left';
    padding?: string;
    handleNewCategoryClick?: () => void;
    children: React.ReactNode;
}

export default function Dropdown({ dropdownTitle = 'Dropdown', addButton = false, handleNewCategoryClick, children, position = 'bottom', padding, basePosition = 'left' }: DropdownProps) {

    const [isOpen, setIsOpen] = useState(false);

    const dropdownBase = css`
        position: relative;
    `

    const dropdownMenuBase = css`
        position: absolute;
        padding: ${padding ? padding : '1rem'};
        background-color: #e2e8f0;
        border-radius: 12px;
        min-width: max-content;
        z-index: 20;
        ${basePosition}: 0;
    `

    const dropdownMenuDefault = css`
        ${dropdownMenuBase}
        top: 100%;
        margin-top: .5rem;
    `

    const dropdownMenuRight = css`
        ${dropdownMenuBase}
        bottom: 0;
        left: 100%;
        margin-left: 1rem;
    `

    const dropdownRef = useRef<HTMLDivElement | null>(null);
    useClickOutside(dropdownRef, setIsOpen);

    return (
        <div className={`dropdown transition-all duration-200 ease-in`} css={dropdownBase} ref={dropdownRef}>
            <button data-testid='dropdown-button' className='relative hover:text-gray-500' onClick={() => setIsOpen(prev => !prev)}>{dropdownTitle}</button>
            <div
                className={`${isOpen ? 'opacity-100 visible pointer-events-auto' : 'opacity-0 invisible pointer-events-none'} transition-all duration-150 ease-in`} data-testid='dropdown-menu' css={position === 'bottom' ? dropdownMenuDefault : dropdownMenuRight}>
                <ul className='flex flex-col gap-4 w-full'>
                    {
                        addButton && <li onClick={handleNewCategoryClick}>
                            <p data-dropdown-clickable className='text-base font-semibold cursor-pointer'>+ Add New Category</p>
                            <div className="line !w-full mt-2"></div>
                        </li>
                    }

                    {children}

                </ul>
            </div>

        </div>
    )
}
