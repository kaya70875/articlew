import React from 'react'

interface TextAreaProps {
    textAreaRef: React.RefObject<HTMLTextAreaElement | null>;
    children?: React.ReactNode;
    defaultValue?: string;
}

export default function TextArea({ textAreaRef, children, defaultValue }: TextAreaProps) {
    return (
        <div className='wrapper w-full'>
            <div className="text-area-wrapper bg-white relative w-full p-4 min-h-36 rounded-lg shadow-lg">
                <textarea value={defaultValue} className='w-full outline-none resize-none text-primaryText' ref={textAreaRef} placeholder='Write a sentence'></textarea>
                <div className='relative flex gap-8 w-full p-4 items-center justify-end'>
                    {children}
                </div>
            </div>
        </div>
    )
}
