import Navbar from "@/components/Navbar";
import Image from "next/image";
import undraw_learning from '../../public/images/undraw_learning.png';
import undraw_texting from '../../public/images/undraw_texting.png';
import Link from "next/link";

export default function Home() {
  return (
    <main className="landing pt-navbar-height">
      <Navbar />

      <div className="hero pt-navbar-height flex flex-col gap-24 px-default-padding 2xl:px-[300px]">
        <header className="flex flex-col gap-8 items-center justify-center">
          <h1 className="max-w-lg text-center">Master English, One Word at a Time</h1>
          <div className="line" />

          <p className="max-w-xl text-center">Learn With Articles finds the phrase you are looking for from articles from different websites and <span>help you to improve and test your English writing.</span></p>

          <button className="primary-button !py-4">
            <Link href={'/signup'}>Start Learning Now</Link>
          </button>
        </header>

        <div className="flex items-center justify-center">
          <h2>How Is it Work ?</h2>
        </div>

        <article className="content flex flex-col gap-24">
          <div className="w-full flex items-center justify-between">
            <Image src={undraw_learning} alt="undraw_learning" width={300} height={300} />
            <div className="flex flex-col gap-4">
              <h3>Find Sentences From Different Topics</h3>
              <p className="max-w-xl">Learn With Articles finds sentence from <span>different topics and sources based on your interest or project.</span> In this way you can fully understand the usage of the word that you search.</p>
            </div>
          </div>

          <div className="w-full flex flex-row-reverse items-center justify-between">
            <Image src={undraw_texting} alt="undraw_texting" width={500} height={500} />
            <div className="flex flex-col gap-4">
              <h3>Every Day Updated</h3>
              <p className="max-w-xl">Learn With Articles updates every day. You can learn new words while you follow news about <span>‘science’ , ‘sport’</span> and more !</p>
            </div>
          </div>

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
