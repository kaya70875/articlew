import Image, { StaticImageData } from 'next/image'
import React from 'react'

const DEFAULT_IMAGE_SIZE = 300;

type ImageProps = {
    src: StaticImageData;
    alt?: string;
    width?: number;
    height?: number;
}
interface LandingCardProps extends React.HTMLAttributes<HTMLDivElement> {
    title: string;
    description: string;
    image: ImageProps;
    variant?: 'light' | 'dark' | 'blue' | 'purple';
}

export default function LandingCard({ title, description, image, variant = 'light', ...props }: LandingCardProps) {

    const themes = {
        light: {
            cardBackgroundColor: 'bg-whitef',
            titleColor: 'text-primaryText',
            textColor: 'text-primaryText'
        },
        dark: {
            cardBackgroundColor: 'bg-primaryText',
            titleColor: 'text-whitef',
            textColor: 'text-whitef'
        },
        blue: {
            cardBackgroundColor: 'bg-primaryBlue',
            titleColor: 'text-whitef',
            textColor: 'text-whitef'
        },
        purple: {
            cardBackgroundColor: 'bg-primaryPurple',
            titleColor: 'text-whitef',
            textColor: 'text-whitef'
        }
    };

    const theme = themes[variant];

    return (
        <div className={`w-full p-4 rounded-xl shadow-lg ${theme.cardBackgroundColor} ${props.className}`}>
            <div className={`w-full h-full flex flex-col gap-8 md:gap-4 items-center justify-between 2xl:justify-around text-center`}>
                <Image className='aspect-square object-cover max-h-[240px]' src={image.src} alt={image.alt ?? 'landing-card-image'} width={image.width ?? DEFAULT_IMAGE_SIZE} height={image.height ?? DEFAULT_IMAGE_SIZE} />
                <div className="flex flex-col gap-4 h-[200px] w-full">
                    <h4 className={`${theme.titleColor}`}>{title}</h4>
                    <p className={`${theme.textColor}`}>{description}</p>
                </div>
            </div>
        </div>
    )
}
