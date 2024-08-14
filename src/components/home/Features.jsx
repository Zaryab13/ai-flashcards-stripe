import { BotIcon } from "lucide-react";

const Features = () => {
  return (
    <section className=" bg-accent/40 px-4 py-8">
      <h2 className="text-center text-slate-900 text-3xl font-medium mb-8">
        Features
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-slate-900">
        <div className="flex flex-col items-center rounded-md cursor-pointer hover:translate-x-[1px] hover:-translate-y-[2px] transition-all duration-300 px-2 py-4 space-y-2 border border-slate-900">
          <BotIcon size="80" />
          <h3 className="text-xl font-medium">Awesome Bot</h3>
          <p className="text-sm text-center px-2 text-slate-800">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Natus
            molestiae perferendis praesentium non dolor similique distinctio
            possimus ipsam delectus iure?
          </p>
        </div>
        <div className="flex flex-col items-center rounded-md cursor-pointer hover:translate-x-[1px] hover:-translate-y-[2px] transition-all duration-300 px-2 py-4 space-y-2 border border-slate-900">
          <BotIcon size="80" />
          <h3 className="text-xl font-medium">Awesome Bot</h3>
          <p className="text-sm text-center px-2 text-slate-800">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Natus
            molestiae perferendis praesentium non dolor similique distinctio
            possimus ipsam delectus iure?
          </p>
        </div>
        <div className="flex flex-col items-center rounded-md sm:col-span-2 md:col-span-1 cursor-pointer hover:translate-x-[1px] hover:-translate-y-[2px] transition-all duration-300 px-2 py-4 space-y-2 border border-slate-900">
          <BotIcon size="80" />
          <h3 className="text-xl font-medium">Awesome Bot</h3>
          <p className="text-sm text-center px-2 text-slate-800">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Natus
            molestiae perferendis praesentium non dolor similique distinctio
            possimus ipsam delectus iure?
          </p>
        </div>
      </div>
    </section>
  );
};

export default Features;
