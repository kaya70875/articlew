'use client';

import SubCard from "@/components/cards/SubCard";
import ApiError from "@/components/errors/ApiError";
import Loading from "@/components/Loading";
import useAPIFetch from "@/hooks/useAPIFetch";
import { PaddlePrices } from "@/types/paddle";
import { useSession } from "next-auth/react";
import UserVerifiedFlag from "./components/UserVerifiedFlag";
import FAQ from "./components/FAQ";

export default function Page() {
    const { data: prices, loading, error } = useAPIFetch<PaddlePrices[]>('/paddle/prices');
    const { data: session } = useSession();

    const userVerified = session?.user.userVerified;

    return (
        <div className='flex flex-col items-center w-full h-screen gap-8'>
            {!userVerified && <UserVerifiedFlag />}

            <header className="flex flex-col gap-4 items-center justify-center">
                <h1>Choose Your Plan</h1>
                <p className="text-2xl font-medium">Unlock Your Writing Potential</p>
            </header>
            <div className="sub-cards flex w-full items-center justify-center gap-8">
                {prices?.map((price, index) => (
                    <SubCard
                        key={index}
                        title={price.name}
                        desc={price.description}
                        priceId={price.price_id}
                        amount={`${price.amount.replaceAll('0', '')} ${price.currency.replace('USD', '$')}`}
                        limits={price.limits}
                    />
                ))}
            </div>

            {loading && <Loading />}
            {error && <ApiError error={error} errorMessage="Error while getting packages" />}

            <FAQ />
        </div>
    );
}
