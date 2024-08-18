import { Zap, BookOpenCheck, ArrowBigDownDash, Orbit } from "lucide-react";
import { colors } from '@/theme'

const Features = () => {
  return (
    <section className=" py-4 ">

      <div className="flex flex-wrap   gap-10 sm:gap-20 md:gap-30 lg:gap-40 justify-center  align-middle text-slate-900 ">
        <div className="flex flex-col items-center rounded-md cursor-pointer hover:translate-x-[1px] hover:-translate-y-[2px] transition-all duration-300 px-2 py-4 space-y-2 ">
          <Zap size="80" className="p-2" style={{
            color: colors.colors.blue,
            boxShadow: `0 0 10px 5px ${colors.colors.blue}`,
            borderRadius: "50%"
          }} />
          <h3 className="text-xl font-medium">Awesome Bot</h3>
          <p className="text-sm text-center  text-slate-400 font-medium">
            Lorem ipsum dolor sit,
          </p>
        </div>
        <div className="flex flex-col items-center rounded-md cursor-pointer hover:translate-x-[1px] hover:-translate-y-[2px] transition-all duration-300 px-2 py-4 space-y-2 ">
          <Orbit size="80" className="p-2" style={{
            color: colors.colors.yellow,
            boxShadow: `0 0 10px 5px ${colors.colors.yellow}`,
            borderRadius: "50%"
          }} />
          <h3 className="text-xl font-medium">Awesome Bot</h3>
          <p className="text-sm text-center  text-slate-400 font-medium">
            Lorem ipsum dolor sit,
          </p>
        </div>
   
        <div className="flex flex-col items-center rounded-md sm:col-span-2 md:col-span-1 cursor-pointer hover:translate-x-[1px] hover:-translate-y-[2px] transition-all duration-300 px-2 py-4 space-y-2 ">
          < ArrowBigDownDash size="80" className="p-2" style={{
            color: colors.colors.pink,
            boxShadow: `0 0 10px 5px ${colors.colors.pink}`,
            borderRadius: "50%"
          }} />
          <h3 className="text-xl font-medium">Awesome Bot</h3>
          <p className="text-sm text-center  text-slate-400 font-medium">
            Lorem ipsum dolor sit,
          </p>
        </div>
      </div>
    </section>
  );
};

export default Features;
