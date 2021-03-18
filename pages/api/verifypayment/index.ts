import { buffer } from "micro";
import Cors from "micro-cors";
import { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";
import pool from "../../../postgres.config";
import axios from "axios";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY_2);
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

export const config = {
  api: {
    bodyParser: false,
  },
};

const cors = Cors({
  allowMethods: ["POST", "HEAD"],
});

const webhookHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const buf = await buffer(req);
    const sig = req.headers["stripe-signature"]!;

    let event: Stripe.Event;

    try {
      event = await stripe.webhooks.constructEvent(
        buf.toString(),
        sig,
        endpointSecret
      );
    } catch (err) {
      // On error, log and return the error message.
      console.log(`❌ Error message: ${err.message}`);
      res.status(400).send(`Webhook Error: ${err.message}`);
      return;
    }

    // Successfully constructed event.
    console.log("✅ Success:", event.id);

    // Cast event data to Stripe object.
    if (event.type === "payment_intent.succeeded") {
      const paymentIntent = event.data.object as Stripe.PaymentIntent;
      console.log(paymentIntent.charges);
      console.log(`💰 PaymentIntent status: ${paymentIntent.status}`);
    } else if (event.type === "payment_intent.payment_failed") {
      const paymentIntent = event.data.object as Stripe.PaymentIntent;
      console.log(paymentIntent);
      console.log(
        `❌ Payment failed: ${paymentIntent.last_payment_error?.message}`
      );
    } else if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;
      console.log(session.customer_email);
      console.log(session);
      console.log(`💵 Session id: ${session.id}`);
      /*await axios
        .post("/api/slices", {
          timeout: 1000,
        })
        .then((response) => {
          console.log(response);
          res.status(200).json("slice purchased");
          res.end();
        })
        .catch((response) => {
          console.log(response);
          res.status(400);
          res.end;
        });*/
      await pool.query(
        "UPDATE slices SET user_id = 2 WHERE id IN (SELECT id FROM slices WHERE user_id IS NULL  LIMIT 1)",
        (error, results) => {
          if (error) {
            throw error;
          }
          res.status(200).json("slice purchased");
          res.end();
        }
      );
    } else {
      console.warn(`🤷‍♀️ Unhandled event type: ${event.type}`);
    }

    // Return a response to acknowledge receipt of the event.
    res.json({ received: true });
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
};

export default cors(webhookHandler as any);
