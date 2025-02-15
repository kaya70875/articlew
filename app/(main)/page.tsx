import Navbar from "@/components/Navbar";
import undraw_learning from '@/public/images/undraw_learning.png';
import undraw_texting from '@/public/images/undraw_texting.png';
import undraw_ai from '@/public/images/undraw_artificial-intelligence_fuvd.svg';
import Link from "next/link";
import LandingCard from "@/components/reusables/LandingCard";

export default function Home() {
  return (
    <main className="landing pt-navbar-height">
      <Navbar />

      <div className="hero pt-navbar-height flex flex-col gap-24 px-default-padding 2xl:px-[300px]">
        <header className="flex flex-col gap-8 items-center justify-center">
          <h1 className="max-w-lg text-center">Master English, One Word at a Time</h1>
          <div className="line" />

          <p className="max-w-xl text-center"><span className="font-semibold">Articlew</span> finds the phrase you are looking for from articles from different websites and <span className="text-primaryBlue font-semibold">help you to improve and test your English writing.</span></p>

          <button className="primary-button !py-3">
            <Link href={'/signup'}>Start Learning Now</Link>
          </button>
        </header>

        <div className="flex items-center justify-center">
          <h2>How Is it Work ?</h2>
        </div>

        <article className="content flex flex-col gap-24">
          <LandingCard title="Find Sentences From Different Topics" description={
            <p>
              <span className="font-semibold">Articlew</span> finds sentence from <span className="text-primaryBlue font-semibold">different topics and sources based on your interest or project.</span> In this way you can fully understand the usage of the word that you search.
            </p>
          } image={undraw_learning} />

          <LandingCard title="Every Day Updated" description={
            <div>
              <span className="font-semibold">Articlew</span> updates every day. You can learn new words while you follow news about <span className="text-primaryBlue font-semibold">science, sport</span> and more !
            </div>
          } image={undraw_texting} />

          <LandingCard title="Smart AI Tools For Your Problems" description={
            <p>
              <span className="font-semibold">Articlew</span> provides intelligent tools to enhance your learning experience with <span className="text-primaryBlue font-semibold">AI-powered writing suggestions, grammar corrections, paraphrase and more</span> to help you master English effectively.
            </p>
          } image={undraw_ai} />
        </article>
      </div>
      <div className="w-full bg-primaryBlue mt-24 p-12 flex gap-16 justify-center items-center">
        <h2 className="text-3xl text-whitef font-bold">Start Learning Now</h2>
        <button className="primary-button--revert">
          <Link href={'/signup'}>Sign Up</Link>
        </button>
      </div>
    </main>
  );
}
