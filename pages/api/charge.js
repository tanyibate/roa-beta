import { request } from "express";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY_2);

export default async (req, res) => {
  if (req.method === "POST") {
    try {
      const YOUR_DOMAIN = process.env.NEXTAUTH_URL;
      const request = JSON.parse(req.body);
      const session = await stripe.checkout.sessions.create({
        customer_email: request.email,
        success_url: `${YOUR_DOMAIN}/artists`,
        cancel_url: `${YOUR_DOMAIN}/artists`,
        line_items: [
          {
            price_data: {
              currency: "usd",
              product_data: {
                name: `${request.artistAlias} Slice`,
                images: [request.imageUrl],
              },
              unit_amount: 500,
            },
            quantity: 1,
          },
        ],
        payment_method_types: ["card"],
        mode: "payment",
      });
      console.log(session.id);
      res.json({ id: session.id });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  }
};
