'use client';

import SubCard from "@/components/cards/SubCard";
import ApiError from "@/components/errors/ApiError";
import Loading from "@/components/Loading";
import useAPIFetch from "@/hooks/useAPIFetch";
import { PaddlePrices } from "@/types/paddle";
import { useSession } from "next-auth/react";
import UserVerifiedFlag from "./components/UserVerifiedFlag";

export default function Page() {
    const { data: prices, loading, error } = useAPIFetch<PaddlePrices[]>('/paddle/prices');
    const { data: session } = useSession();

    const userVerified = session?.user.userVerified;

    return (
        <div className='flex flex-col items-center justify-center w-full h-screen gap-4'>
            {!userVerified && <UserVerifiedFlag />}

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
