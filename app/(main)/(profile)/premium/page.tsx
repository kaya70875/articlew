import SubCard from "@/components/cards/SubCard";
import UserVerifiedFlag from "./components/UserVerifiedFlag";
import FAQ from "./components/FAQ";
import Footer from "../../components/Footer";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { PaddlePrices } from "@/types/paddle";

export default async function Page() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/paddle/prices`);

    const prices: PaddlePrices[] = await res.json();

    const session = await getServerSession(authOptions);
    const userVerified = session?.user.userVerified;

    return (
        <div className='flex flex-col items-center w-full gap-8'>
            {!userVerified && <UserVerifiedFlag />}

            <div className="w-full h-full lg:h-screen flex flex-col items-center justify-center gap-16 p-4">
                <header className="flex flex-col gap-4 items-center justify-center text-center">
                    <h1>Choose Your Plan</h1>
                    <p className="text-2xl font-medium">Unlock Your Writing Potential</p>
                </header>
                <div className="sub-cards flex flex-col flex-wrap md:flex-row w-full items-center justify-center gap-8">
                    {prices?.map((price, index) => (
                        <SubCard
                            key={index}
                            title={price.name}
                            desc={price.description}
                            priceId={price.price_id}
                            amount={`${Number(price.amount) / 100} ${price.currency.replace('USD', '$')}`}
                            limits={price.limits}
                        />
                    ))}
                </div>

            </div>

            <section className="hero-line flex flex-col gap-8 mb-0 md:mb-24 items-center justify-center text-center w-full bg-lightBlue p-8 rounded-lg shadow-lg">
                <div className="flex flex-col gap-4">
                    <h2 className="text-primaryPurple">Unlock your full potential.</h2>
                    <h4 className="max-w-4xl">Access advanced tools, unlimited AI support, and personalized learning to take your English to the next level.</h4>
                </div>
                <button className="primary-button">Start Premium Now</button>
            </section>

            <FAQ />

            <Footer />
        </div>
    );
}
