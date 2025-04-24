'use client';

import Navbar from "@/components/Navbar";
import undraw_learning from '@/public/images/undraw_learning.png';
import searchPng from '@/public/images/search_engine.png';
import undraw_ai from '@/public/images/undraw_ai.png';
import Link from "next/link";
import LandingCard from "@/components/reusables/LandingCard";
import { useSession } from "next-auth/react";
import Footer from "./components/Footer";

export default function Home() {

  const session = useSession();
  const isAuth = session.status === 'authenticated';

  const landingCards = [
    {
      title: "Explore Sentences from Diverse Topics",
      description: "Articlew helps you discover example sentences from a wide range of sources, tailored to your interests and learning goals.",
      image: { src: undraw_learning, alt: 'undraw_learning', width: 200, height: 200 },
      variant: 'dark',
    },
    {
      title: "Fresh Content, Daily",
      description: "New sentences are added every day, so you can expand your vocabulary while staying up to date with topics like science, sports, and more.",
      image: { src: searchPng },
      variant: 'light',
    },
    {
      title: "AI-Powered Learning Tools",
      description: "Boost your English with intelligent features like writing suggestions, grammar correction, and paraphrasing—all powered by AI.",
      image: { src: undraw_ai },
      variant: 'light',
    }
  ] as const;

  const aiTools = [
    {
      title: "Paraphrase Instantly",
      description: "Easily rewrite sentences with our AI-powered paraphrasing tool—perfect for learning new ways to express your thoughts more naturally and fluently.",
    },
    {
      title: "Fix Grammar & Structure",
      description: "Get real-time sentence correction for grammar, spelling, and clarity. Perfect your writing and learn from AI-powered suggestions.",
    },
    {
      title: "Compare Word Usage",
      description: "Not sure which word fits better? Instantly compare different words in real-world sentence examples to pick the most natural choice.",
    }
  ] as const;



  return (
    <main className="landing pt-navbar-height">
      <Navbar />

      <div className="hero pt-navbar-height flex flex-col gap-24 px-4 md:px-[80px] xl:px-default-padding 2xl:px-[250px]">
        <header className="flex flex-col gap-8 items-center justify-center">
          <h1 className="max-w-2xl text-center">Master English, One Word at a Time</h1>
          <p className="max-w-3xl font-medium text-xl opacity-95 text-center"><span className="font-semibold text-primaryPurple">Articlew</span> finds the phrase you are looking for from articles from different articles and <span className="text-primaryBlue font-semibold">help you to improve and test your English writing.</span></p>

          <button className="primary-button !py-3">
            <Link href={`${isAuth ? '/search' : '/signup'}`}>Start Learning Now</Link>
          </button>
        </header>

        <div className="flex items-center justify-center">
          <h2>Explore</h2>
        </div>

        <article className="content flex flex-col xl:flex-row gap-16">
          {landingCards.map((card, index) => (
            <LandingCard key={index} title={card.title} description={card.description} image={card.image} variant={card.variant} />
          ))}
        </article>

        <div className="flex items-center justify-center">
          <h2>AI Tools</h2>
        </div>

        <section className="flex flex-col gap-16">
          {aiTools.map((tool, index) => (
            <div key={index} className="flex flex-col lg:flex-row gap-16 items-center justify-center">
              <div className="flex flex-col gap-4 items-center justify-center w-full text-center">
                <h3 className="text-2xl font-bold">{tool.title}</h3>
                <p className="text-lg text-primaryText opacity-80 max-w-2xl">{tool.description}</p>
              </div>
            </div>
          ))}
        </section>

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
