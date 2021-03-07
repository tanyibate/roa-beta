const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export default async (req, res) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 500,
      currency: "usd",
      payment_method_types: ["card"],
      receipt_email: "jenny.rosen@example.com",
    });

    if (!paymentIntent) throw new Error("charge unsuccessful");

    res.status(200).json({
      message: "charge posted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
