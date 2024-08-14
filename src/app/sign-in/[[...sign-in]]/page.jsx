import MainHeader from "@/components/ui/MainHeader";
import { SignIn } from "@clerk/nextjs";

const Page = () => {
  return (
    <section className="flex items-center justify-center flex-col py-8 gap-4">
      <MainHeader>Sign In</MainHeader>
      <SignIn />
    </section>
  );
};

export default Page;
