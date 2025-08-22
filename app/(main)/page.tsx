'use client';

import Navbar from "@/components/Navbar";
import { useSession } from "next-auth/react";
import HeroSection from "./components/HeroSection";
import FeaturesSection from "./components/FeaturesSection";
import Footer from "./components/Footer";
import CTASection from "./components/CTASection";

export default function Home() {

  const session = useSession();
  const isAuth = session.status === 'authenticated';

  return (
    <main className="landing">
      <Navbar />

      <div className="hero pt-10 md:pt-navbar-height flex flex-col ">
        <div className="hero h-screen">
          <HeroSection />
        </div>

        <FeaturesSection />

        <CTASection />
      </div>

      <Footer />
    </main>
  );
}
