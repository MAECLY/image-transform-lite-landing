import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import HowItWorks from "@/components/HowItWorks";
import Features from "@/components/Features";
import TransformationsShowcase from "@/components/TransformationsShowcase";
import Download from "@/components/Download";
import Footer from "@/components/Footer";

export default function LocalePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Stats />
        <HowItWorks />
        <Features />
        <TransformationsShowcase />
        <Download />
      </main>
      <Footer />
    </>
  );
}
