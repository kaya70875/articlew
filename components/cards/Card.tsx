/** @jsxImportSource @emotion/react */
import { getSourceName } from '@/utils/helpers';
import React from 'react'
import InformationBubble from '../reusables/InformationBubble';
import { css } from '@emotion/react';

type IconProps = {
    icon: React.ReactSVGElement | React.ReactElement;
    onClick?: (arg: string) => void;
}

interface CardProps {
    text?: string | React.JSX.Element;
    icons?: IconProps[];
    source?: string;
    children?: React.ReactNode;

    borderRadius?: string;
    gap?: string;
}

export default function Card({ text, icons, source, children, borderRadius, gap }: CardProps) {

    const cardBase = css`
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        background-color: #fff;
        gap: ${gap || '1.75rem'};
        border-radius: ${borderRadius || '0.75rem'};
    `

    const handleSourceClick = () => {
        if (typeof window !== 'undefined') {
            window.open(source, '_blank');
        }
    }

    return (
        <div className='shadow-lg p-3 xs:p-6' css={cardBase}>
            {text && <p className='text-base' dangerouslySetInnerHTML={{ __html: text ?? '' }} />}
            {icons && <div className='w-full flex items-center justify-between'>
                <div className='flex items-center gap-2'>
                    {icons?.map((icon, index) => (
                        <div key={index} className='cursor-pointer text-primaryText hover:text-gray-600' onClick={() => icon.onClick?.(text as string)}>
                            {icon.icon}
                        </div>
                    ))}
                </div>
                <InformationBubble information='View source'>
                    <p className='text-primaryBlue hover:underline cursor-pointer capitalize' onClick={handleSourceClick}>{source && getSourceName(source)}</p>
                </InformationBubble>
            </div>}

            {children}
        </div>
    )
}
