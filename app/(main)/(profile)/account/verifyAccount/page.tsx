'use client';

import Loading from '@/components/Loading';
import { useEmailVerify } from '@/hooks/account/useEmailVerify';
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react';

export default function Page() {
    const { verifyAccount } = useEmailVerify();
    const [loading, setLoading] = useState(true);
    const [success, setSuccess] = useState<boolean | null>(null);

    const searchParams = useSearchParams();
    const token = searchParams.get('token');

    useEffect(() => {
        if (!token) return;

        const verify = async () => {
            try {
                const res = await verifyAccount(token);
                setSuccess(res || false);
            } catch (e) {
                console.error(e);
                setSuccess(false);
            } finally {
                setLoading(false);
            }
        };

        verify();
    }, [token, verifyAccount]);

    return (
        <div className="flex items-center justify-center w-full min-h-screen">
            {loading ? (
                <Loading />
            ) : success ? (
                <div className="text-green-600 text-lg">Your email has been verified!</div>
            ) : (
                <div className="text-red-500 text-lg">Verification failed or token is invalid.</div>
            )}
        </div>
    );
}
