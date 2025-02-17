/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { JSX } from '@emotion/react/jsx-runtime';
import React, { useState } from 'react'

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
        display: ${isOpen ? 'block' : 'none'};
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

    return (
        <div className='dropdown' css={dropdownBase}>
            <button className='relative hover:text-gray-500' onClick={() => setIsOpen(prev => !prev)}>{dropdownTitle}</button>
            <div
                className='dropdown-menu' css={position === 'bottom' ? dropdownMenuDefault : dropdownMenuRight}>
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
