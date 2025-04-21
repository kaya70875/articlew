'use client'
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

    const openCheckout = () => {
        try {
            paddle?.Checkout.open({
                items: [{ priceId: priceId, quantity: 1 }],
                customData: {
                    email: session?.user.email,
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
