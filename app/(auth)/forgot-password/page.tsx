'use client';

import InputField from '@/components/inputs/InputField'
import { useToast } from '@/context/ToastContext';
import useEmailVerificationTimer from '@/hooks/useEmailVerificationTimer'
import axios from 'axios';
import React, { useState } from 'react'

export default function Page() {

    const { showToast } = useToast();
    const { canResend, countdown, emailSent, triggerEmailSent } = useEmailVerificationTimer();
    const [email, setEmail] = useState('');

    const [loading, setLoading] = useState(false);

    const handleSendResetLink = async () => {
        try {
            setLoading(true);
            await axios.post("/api/account/sendResetLink", { email: email });
            showToast("Reset link sent to your email", "success");
            triggerEmailSent();
            setLoading(false);
        } catch (e) {
            console.error('Error while sending reset link.', e);
            showToast("Error while sending reset link", "error");
            setLoading(false);
        }
    }

    return (
        <div className='w-full h-screen flex flex-col gap-8 items-center justify-center bg-main p-8'>
            <header className='flex flex-col gap-2 items-center justify-center'>
                <h3>Reset Your Password</h3>
                <p>Please write your email down below we will send a reset link.</p>
            </header>

            <div className='w-full max-w-2xl flex flex-col gap-4 items-center justify-center'>
                <InputField label='Email' onChange={(e) => setEmail(e.target.value)} />
                <button disabled={loading} className={`secondary-button ${canResend ? 'pointer-events-auto' : 'pointer-events-none'}`} onClick={handleSendResetLink}>{!emailSent ? `${loading ? 'Sending...' : 'Send Reset Link'}` : `Send again in ${countdown} seconds`}</button>
            </div>
        </div>
    )
}
