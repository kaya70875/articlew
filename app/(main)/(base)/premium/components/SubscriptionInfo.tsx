import useAPIFetch from '@/hooks/useAPIFetch';
import { PaddleSubsctiption } from '@/types/paddle';
import { useSession } from 'next-auth/react';
import Link from 'next/link'
import React from 'react'

export default function SubscriptionInfo() {

    const { data: session } = useSession();
    const currentUser = session?.user;

    const { data: subscription, error } = useAPIFetch<PaddleSubsctiption>(`/paddle/subscriptions/${currentUser?.subscription_id}`)

    if (error) {
        console.error('Error while getting subscription', error);
    }

    if (!subscription) return null;
    if (currentUser?.subscription_status === 'inactive') return null;

    else if (currentUser?.subscription_status === 'active') {
        return ActiveProfile(subscription);
    }

    else if (currentUser?.subscription_status === 'cancelled') {
        return CanceledProfile(subscription);
    }
}

const ActiveProfile = (subscription: PaddleSubsctiption) => {
    return (
        <div className='flex items-center gap-4'>
            <Link className='font-semibold opacity-80 underline hover:opacity-70' href={subscription?.update_url ?? ''}>Manage Subscriptions</Link>
            <Link className='font-semibold opacity-80 underline hover:opacity-70 text-red-600' href={subscription?.cancel_url ?? ''}>Cancel Subscription</Link>
        </div>
    )
}

const CanceledProfile = (subscription: PaddleSubsctiption) => {
    return (
        <div className='bg-primaryPurple bg-opacity-40 p-2 rounded-lg w-full flex items-center gap-2'>
            ℹ️
            <p className='text-primaryText'>This subscription is scheduled to be canceled on {subscription.cancellation_effective_at?.toString().split('T')[0]}</p>
            <Link className='font-semibold opacity-80 underline hover:opacity-70' href={subscription?.update_url ?? ''}>Revert Subscription</Link>
        </div>
    )
}
