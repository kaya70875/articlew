'use client';

import Loading from '@/components/Loading';
import axios from 'axios';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react';
import successSvg from '@/public/images/success.svg';
import errorSvg from '@/public/images/error.svg';
import Link from 'next/link';

export default function Page() {
    const [loading, setLoading] = useState(true);
    const [success, setSuccess] = useState<boolean | null>(null);

    const searchParams = useSearchParams();
    const token = searchParams.get('token');

    useEffect(() => {
        if (!token) return;

        const verifyAccount = async () => {
            try {
                const res = await axios.post("/api/account/verifyAccount", { token: token })
                setSuccess(res.status === 200 || false);
            } catch (e) {
                console.error(e);
                setSuccess(false);
            } finally {
                setLoading(false);
            }
        };

        verifyAccount();
    }, [token]);

    return (
        <div className="flex items-center justify-center w-full min-h-screen">
            {loading ? (
                <Loading />
            ) : success ? (
                <div className='flex flex-col gap-4 items-center justify-center'>
                    <Image src={successSvg} width={128} height={128} alt='success' />
                    <h1 className='text-2xl font-bold'>Email verified successfully!</h1>
                    <Link className='primary-button' href={'/premium'}>Go Back</Link>
                </div>
            ) : (
                <div className='flex flex-col gap-4 items-center justify-center'>
                    <Image src={errorSvg} width={128} height={128} alt='success' />
                    <h1 className='text-2xl font-bold'>Verification Failed</h1>
                    <p>Token might be expired please try again.</p>
                    <Link className='primary-button' href={'/premium'}>Go Back</Link>
                </div>
            )}
        </div>
    );
}
