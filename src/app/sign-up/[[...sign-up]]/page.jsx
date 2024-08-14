import { SignUp } from "@clerk/nextjs";

const Page = () => {
  return (
    <section className="flex items-center justify-center flex-col py-8 gap-4">
      <h1 className="text-4xl font-semibold">Sign Up</h1>
      <SignUp />
    </section>
  );
};

export default Page;
