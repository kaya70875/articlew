import useEmailVerificationTimer from '@/hooks/useEmailVerificationTimer';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import React, { useState } from 'react'

export default function UserVerifiedFlag() {
    const { data: session } = useSession();
    const [loadingEmail, setLoadingEmail] = useState(false);

    const {
        countdown,
        emailSent,
        canResend,
        triggerEmailSent
    } = useEmailVerificationTimer(20); // 20 seconds cooldown

    const handleSendEmail = async () => {
        try {
            setLoadingEmail(true);
            const res = await axios.post('/api/account/sendVerificationEmail', { email: session?.user.email })
            if (res.status === 200) {
                triggerEmailSent();
            }
            setLoadingEmail(false);
        } catch (e) {
            console.error(e);
        }
    }

    return (
        <div className="flag w-full fixed top-0 flex items-center justify-center bg-primaryPurple p-2">
            <div className="flex items-center gap-2">
                <p className="font-medium text-whitef">
                    {emailSent ? 'Verification link sent to your email ✅' : 'Please verify your email before upgrading.'}
                </p>
                <p
                    onClick={canResend ? handleSendEmail : undefined}
                    className={`underline font-semibold cursor-pointer text-primaryText ${canResend ? 'pointer-events-auto' : 'pointer-events-none text-opacity-50'}`}
                >
                    {emailSent && countdown > 0 ? `Send again in ${countdown}s` : loadingEmail ? 'Sending...' : 'Send Verification Email'}
                </p>
            </div>
        </div>
    )
}
