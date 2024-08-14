import { Button } from "../ui/button";
import MainHeader from "../ui/MainHeader";

const Hero = () => {
  return (
    <section className="h-hero flex flex-col items-center justify-center space-y-6">
      <MainHeader>Welcome to Flashcards Saas!!</MainHeader>
      <h5 className="max-w-[70%] text-center">
        Generate and manage Flashcards with ease. Upload your text, select
        categories, and let the magic happen!
      </h5>
      <Button
        variant="contained"
        className="border border-accent hover:border-transparent bg-transparent hover:bg-accent transition-all hover:text-white"
      >
        Get Started
      </Button>
    </section>
  );
};

export default Hero;
