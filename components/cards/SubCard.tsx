'use client'
import { useToast } from '@/context/ToastContext';
// This component is used to display a subscription card with a title, description, and a checkout button.
import { usePaddle } from '@/hooks/usePaddle';
import { useSession } from 'next-auth/react';
import React from 'react'

interface SubCardProps {
    title: string;
    desc: string;
    amount: string;
    priceId: string;
}

export default function SubCard({ title, desc, priceId, amount }: SubCardProps) {

    const paddle = usePaddle();
    const { data: session } = useSession();
    const { showToast } = useToast();

    const openCheckout = () => {
        try {
            if (session?.user.subscription_status === 'active') return showToast('You already have a subscription', 'error');
            if (!session?.user.email) return;
            if (!session.user.userVerified) return showToast('Please verify your email before upgrading', 'error');

            paddle?.Checkout.open({
                items: [{ priceId: priceId, quantity: 1 }],
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

    return (
        <div className='flex flex-col gap-4 p-4 items-center justify-center w-full md:w-1/3 lg:w-1/4 bg-white rounded-lg shadow-lg'>
            <header className='flex flex-col items-center justify-center w-full'>
                <h2 className='text-xl font-bold'>{title}</h2>
                <p className='text-gray-600'>{desc}</p>
            </header>

            <div className="amount">
                <h4>{amount}</h4>
            </div>

            <button className="primary-button" onClick={openCheckout}>Checkout</button>
        </div>
    )
}
