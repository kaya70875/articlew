import React from 'react'
import DOMPurify from 'dompurify';

interface SafeHTMLProps {
    className?: string;
    html: string;
}

export default function SafeHTML({ html, className }: SafeHTMLProps) {

    const sanitizedHTML = DOMPurify.sanitize(html);

    return (
        <p className={className} dangerouslySetInnerHTML={{ __html: sanitizedHTML }} />
    )
}
