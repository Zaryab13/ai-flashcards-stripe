import Features from "@/components/home/Features";
import Hero from "@/components/home/Hero";
import Pricing from "@/components/home/Pricing";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>Flashcareds Saas</title>
        <meta
          name="description"
          content="Generated flashcards from your text"
        />
      </Head>
      <Hero />
      <Features />
      <Pricing />
    </>
  );
}
