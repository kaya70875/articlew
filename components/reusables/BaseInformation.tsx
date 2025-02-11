import Image, { StaticImageData } from 'next/image';
import React from 'react'

interface BaseInformationProps {
    svgFile: StaticImageData;
    title?: string;
    description?: string;
    svgWidth?: number;
    svgHeight?: number;
}

export default function BaseInformation({ svgFile, title, description, svgWidth = 300, svgHeight = 300 }: BaseInformationProps) {
    return (
        <div className='flex flex-col gap-12 p-2 md:p-8 xl:p-12 items-center justify-center'>
            <header className='flex flex-col gap-4 text-center'>
                <h3>{title}</h3>
                <p className='text-sm md:text-base max-w-2xl'>{description}</p>
            </header>

            <Image src={svgFile} alt='svg-file' width={svgWidth} height={svgHeight} />
        </div>
    )
}
