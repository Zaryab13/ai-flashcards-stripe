import { Button } from "../ui/button";
import MainHeader from "../ui/MainHeader";
import { colors } from '@/theme'
import { poppinsLight, poppinsBold } from '@/theme';
import '../../app/globals.css';
const Hero = () => {
  return (
    <section className="h-hero flex flex-col items-center justify-center space-y-6">
      <MainHeader className="">

        <div className="py-5 md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl space-y-10 text-center" style={{ fontFamily: poppinsBold.fontFamily }}>
          <span className="text-blue-600" >Write</span>, <span className="text-rose-600">Study</span> and <span className="text-amber-600">Slay</span>
        </div>

        <div className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl text-center">
          Your School with Ai
        </div>

      </MainHeader>
      <h5 className="max-w-[40%] text-center `${theme.poppinsLight.className} ">
        Generate and manage Flashcards with ease. Upload your text and <div style={{ color: "#F8AD2D" }}>let the magic happen!</div>
      </h5>
      <Button
        variant="contained"
        className="blue-btn"
      >
        Get Started
      </Button>
    </section>
  );
};

export default Hero;
