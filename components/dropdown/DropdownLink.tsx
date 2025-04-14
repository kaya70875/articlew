import React from 'react';

interface DropdownLinkProps {
    name: string;
    onClick?: React.MouseEventHandler<HTMLParagraphElement>;
    className?: string;
}

export default function DropdownLink({ name, onClick, className }: DropdownLinkProps) {
    return (
        <p
            onClick={onClick}
            className={`cursor-pointer hover:opacity-80 ${className}`}
            data-dropdown-clickable
        >
            {name}
        </p>
    );
}
