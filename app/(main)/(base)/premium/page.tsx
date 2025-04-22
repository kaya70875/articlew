'use client';

import SubCard from "@/components/cards/SubCard";
import ApiError from "@/components/errors/ApiError";
import Loading from "@/components/Loading";
import useAPIFetch from "@/hooks/useAPIFetch";
import { PaddlePrices } from "@/types/paddle";
import { useSession } from "next-auth/react";
import useEmailVerificationTimer from "@/hooks/useEmailVerificationTimer";
import axios from "axios";
import { useState } from "react";

export default function Page() {
    const { data: prices, loading, error } = useAPIFetch<PaddlePrices[]>('/paddle/prices');
    const { data: session } = useSession();

    const [loadingEmail, setLoadingEmail] = useState(false);

    const {
        countdown,
        emailSent,
        canResend,
        triggerEmailSent
    } = useEmailVerificationTimer(20); // 20 seconds cooldown

    const userVerified = session?.user.userVerified;

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
        <div className='flex flex-col items-center justify-center w-full h-screen gap-4'>
            {!userVerified && (
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
            )}

            {prices?.map((price, index) => (
                <SubCard
                    key={index}
                    title={price.name}
                    desc={price.description}
                    priceId={price.price_id}
                    amount={`${price.amount.replaceAll('0', '')} ${price.currency.replace('USD', '$')}`}
                />
            ))}

            {loading && <Loading />}
            {error && <ApiError error={error} errorMessage="Error while getting packages" />}
        </div>
    );
}
