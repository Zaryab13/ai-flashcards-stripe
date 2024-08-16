"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "../ui/separator";
import { pricingPlanData } from "@/lib/data";
import { useToast } from "@/components/ui/use-toast";
import getStripe from "@/utils/get-stripe";

const Pricing = () => {
<<<<<<< Updated upstream
  const { toast } = useToast();

  const handleSubmit = async () => {
    const checkoutSession = await fetch("/api/checkout_session", {
      method: "POST",
      headers: {
        origin: "https://localhost:3000",
      },
    });

    const checkoutSessionJson = await checkoutSession.json();

    if (checkoutSession.statusCode === 5000) {
      toast({
        title: "Checkout Server Error",
        description: checkoutSession.message,
        variant: "destructive",
      });
      return;
    }

    const stripe = await getStripe();
    const { error } = await stripe.redirectToCheckout({
      sessionId: checkoutSessionJson.id,
    });

    if (error) {
      toast({
        title: "Checkout Server Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return (
    <section className="px-4 py-16 ">
      <h2 className="text-4xl font-semibold text-center mb-12">Pricing</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full px-6">
        {pricingPlanData.map(
          ({ plan, price, features, buttonText, isPayable }, i) => (
            <div
              key={i}
              className="px-4 py-6 rounded-xl flex flex-col gap-2 shadow-[4px_4px_10px_rgba(0,0,0,0.08),-4px_-4px_10px_rgba(0,0,0,0.08)] "
            >
              <div>
                <h6 className="text-slate-800 font-semibold text-xl">{plan}</h6>
                <span className="text-slate-900 font-bold text-3xl">
                  {price}
                </span>
              </div>
              <Separator className="bg-accent" />
              <div className="ps-4">
                <ul className="text-sm text-slate-800 list-disc">
                  {features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </div>
              <Button
                onClick={() => {
                  if (isPayable) {
                    handleSubmit();
                  }
                }}
                className="bg-accent/10 text-slate-900 hover:bg-accent hover:border-transparent hover:text-slate-100 transition-all"
              >
                {buttonText}
              </Button>
            </div>
          )
        )}
      </div>
    </section>
  );
=======
	return (
		<section className="px-4 py-16 md:px-8 md:py-20  ">
			<h2 className="text-3xl md:text-5xl font-bold text-center mb-12 md:mb-16 text-slate-800">
				Pricing
			</h2>
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 px-6  gap-8 w-full max-w-7xl mx-auto">
				{pricingPlanData.map(({ plan, price, features, buttonText }, i) => (
					<div
						key={i}
						className="md:p-8 p-6 rounded-xl flex flex-col gap-2 shadow-[4px_4px_10px_rgba(0,0,0,0.08),-4px_-4px_10px_rgba(0,0,0,0.08)] bg-gradient-to-br from-teal-100 to-white min-h-[300px] md:min-h-[400px] transform transition-transform duration-300 hover:scale-105"
						style={{
							background: "linear-gradient(135deg, #52C3FE, white)",
						}}
					>
						<div className="mb-1">
							<h6 className="text-slate-800 font-semibold text-xl  mb-4">
								{plan}
							</h6>
							<span className="text-slate-900 font-bold text-3xl">{price}</span>
						</div>
						<Separator className="bg-accent my-8" />
						<h3 className="text-sm  font-semibold mb-4 ">You can upload:</h3>
						<div className="ps-4 flex-grow">
							<ul className="text-sm text-slate-800 list-disc space-y-2">
								{features.map((feature, index) => (
									<li key={index}>{feature}</li>
								))}
							</ul>
						</div>
						<Button className="bg-accent/10 mt-2  text-slate-900 font-bold hover:bg-accent hover:border-transparent hover:text-slate-100 transition-all">
							{buttonText}
						</Button>
					</div>
				))}
			</div>
		</section>
	);
>>>>>>> Stashed changes
};

export default Pricing;
