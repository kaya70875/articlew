import Image, { StaticImageData } from 'next/image'
import React from 'react'

interface LandingCardProps extends React.HTMLAttributes<HTMLDivElement> {
    title: string;
    description: string | React.ReactNode;
    image: StaticImageData;
    cardBackgroundColor?: string;
    cardDirection?: 'row' | 'row-reverse';
}

export default function LandingCard({ title, description, image, cardBackgroundColor, cardDirection = 'row-reverse', ...props }: LandingCardProps) {
    return (
        <div className={`w-full p-4 rounded-xl shadow-lg ${cardBackgroundColor}`} {...props}>
            <div className={`w-full flex flex-col md:flex-${cardDirection} gap-8 md:gap-0 items-center justify-between 2xl:justify-around`}>
                <Image src={image} alt="undraw_texting" width={300} height={300} />
                <div className="flex flex-col gap-4">
                    <h3>{title}</h3>
                    <p className="max-w-xl">{description}</p>
                </div>
            </div>
        </div>
    )
}
