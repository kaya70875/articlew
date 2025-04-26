'use client'
import { useToast } from '@/context/ToastContext';
// This component is used to display a subscription card with a title, description, and a checkout button.
import { usePaddle } from '@/hooks/usePaddle';
import { Limits } from '@/types/paddle';
import { useSession } from 'next-auth/react';
import React from 'react'

interface SubCardProps {
    title: string;
    desc: string;
    amount: string;
    priceId: string;
    limits: Limits;
}

export default function SubCard({ title, desc, priceId, amount, limits }: SubCardProps) {

    const paddle = usePaddle();
    const { data: session } = useSession();
    const { showToast } = useToast();

    const activePackage = session?.user.userType === title;
    const higherPackage = session?.user.userType.replace(' ', '') === 'PremiumPlus';
    const freePackage = title === 'Free';

    const openCheckout = () => {
        try {
            if (!session?.user.email) return;
            if (!session.user.userVerified) return showToast('Please verify your email before upgrading', 'error');

            paddle?.Checkout.open({
                items: [{ priceId: priceId, quantity: 1 }],
                customer: {
                    email: session.user.email
                },
                customData: {
                    email: session?.user.email,
                },
                settings: {
                    successUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/account?success=true`,
                }

            })
        } catch (e) {
            console.error(e);
        }
    }

    const LIMITS = [
        { name: 'Searches', value: limits.search },
        { name: 'AI Word Analysis', value: limits.generate },
        { name: 'Grammar Check', value: limits.grammar },
        { name: 'Fix Errors', value: limits.fix },
        { name: 'Compare Words', value: limits.compare },
    ] as const;

    return (
        <div className={`flex flex-col gap-8 p-8 items-center justify-center w-full bg-lightBlue border border-primaryPurple ${title === 'Premium' && 'border-4'} rounded-lg shadow-lg max-w-sm`}>
            <div className='flex flex-col gap-2 items-center justify-center'>
                <header className='flex flex-col items-center justify-center w-full'>
                    <h3>{title}</h3>
                    <p className='text-gray-600'>{desc}</p>
                </header>

                <div className="amount">
                    <h4>{amount}/month</h4>
                </div>
            </div>

            <section className="features w-full flex flex-col gap-4">
                {LIMITS.map((limit, index) => (
                    <div key={index} className='flex items-center justify-between w-full'>
                        <p>{limit.name}</p>
                        <p className='font-bold capitalize'>{limit.value}</p>
                    </div>
                ))}
            </section>
            <button className={`primary-button w-full ${(activePackage || freePackage || higherPackage) && 'pointer-events-none opacity-50'}`} onClick={openCheckout}>{(activePackage || freePackage) ? 'Active' : 'Purchase'}</button>
        </div>
    )
}
