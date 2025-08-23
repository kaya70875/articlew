import React from 'react'
import SignupFeatures from './SignupFeatures';

interface AuthHeroProps {
    title: string;
    desc: string;
    featuresSection?: boolean;
}

export default function AuthHero({ title, desc, featuresSection }: AuthHeroProps) {
    return (
        <div className="flex flex-col space-y-4">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl text-gray-900">
                {title}
            </h2>
            <p className="text-lg text-gray-600 max-w-md">
                {desc}
            </p>
            {featuresSection && (
                <SignupFeatures />
            )}

        </div>
    )
}
