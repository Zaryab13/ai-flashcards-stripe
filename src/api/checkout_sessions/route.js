import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2022-11-15",
});

const formatAmountForStripe = (amount, currency) => {
  return Math.round(amount * 100);
};

export const POST = async (req, res) => {
  const params = {
    mode: "subscription",
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: "Pro subscription",
          },
          unit_amount: formatAmountForStripe(10, "usd"), // $10
          recurring: {
            interval: "month",
            interval_count: 1,
          },
        },
        quantity: 1,
      },
    ],
    success_url: `${req.headers.get(
      Referer
    )}result?sessions_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${req.headers.get(
      Referer
    )}result?session)id-{CHECKOUT_SESSION_ID}`,
  };

  const checkoutSession = await stripe.checkout.sessions.create(params);

  return res.json(checkoutSession, {
    status: 200,
  });
};
