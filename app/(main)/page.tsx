'use client';

import Navbar from "@/components/Navbar";
import undraw_learning from '@/public/images/undraw_learning.png';
import undraw_texting from '@/public/images/undraw_texting.png';
import undraw_ai from '@/public/images/undraw_artificial-intelligence_fuvd.svg';
import Link from "next/link";
import LandingCard from "@/components/reusables/LandingCard";
import { useSession } from "next-auth/react";
import Footer from "./components/Footer";

export default function Home() {

  const session = useSession();
  const isAuth = session.status === 'authenticated';

  const landingCards = [
    {
      title: "Find Sentences From Different Topics",
      description: "Articlew finds sentence from different topics and sources based on your interest or project.",
      image: { src: undraw_learning, alt: 'undraw_learning', width: 200, height: 200 },
      variant: 'dark',
      cardDirection: 'row'
    },
    {
      title: "Every Day Updated",
      description: "Articlew updates every day. You can learn new words while you follow news about science, sport and more !",
      image: { src: undraw_texting },
      variant: 'blue',
      cardDirection: 'row-reverse'
    },
    {
      title: "Smart AI Tools For Your Problems",
      description: "Articlew provides intelligent tools to enhance your learning experience with AI-powered writing suggestions, grammar corrections, paraphrase and more to help you master English effectively.",
      image: { src: undraw_ai },
      variant: 'purple',
      cardDirection: 'row'
    }
  ] as const;

  return (
    <main className="landing pt-navbar-height">
      <Navbar />

      <div className="hero pt-navbar-height flex flex-col gap-24 px-4 md:px-[80px] xl:px-default-padding 2xl:px-[300px]">
        <header className="flex flex-col gap-8 items-center justify-center">
          <h1 className="max-w-lg text-center">Master English, One Word at a Time</h1>
          <div className="line" />

          <p className="max-w-xl text-center"><span className="font-semibold">Articlew</span> finds the phrase you are looking for from articles from different websites and <span className="text-primaryBlue font-semibold">help you to improve and test your English writing.</span></p>

          <button className="primary-button !py-3">
            <Link href={`${isAuth ? '/search' : '/signup'}`}>Start Learning Now</Link>
          </button>
        </header>

        <div className="flex items-center justify-center">
          <h2>How Is it Work ?</h2>
        </div>

        <article className="content flex flex-col gap-24">
          {landingCards.map((card, index) => (
            <LandingCard key={index} title={card.title} description={card.description} cardDirection={card.cardDirection} image={card.image} variant={card.variant} />
          ))}

        </article>
      </div>
      <div className="w-full bg-primaryBlue mt-24 p-12 flex gap-16 justify-center items-center">
        <h2 className="text-3xl text-whitef font-bold">Start Learning Now</h2>
        <button className="primary-button--revert">
          <Link href={'/signup'}>Sign Up</Link>
        </button>
      </div>

      <Footer />
    </main>
  );
}
