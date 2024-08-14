import Features from "@/components/home/Features";
import Hero from "@/components/home/Hero";
import Pricing from "@/components/home/Pricing";
import { Button } from "@/components/ui/button";
import { BotIcon } from "lucide-react";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>Flashcards Saas</title>
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
