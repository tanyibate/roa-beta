import { buffer } from "micro";
import Cors from "micro-cors";
import { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";
import pool from "../../../postgres.config";
import axios from "axios";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
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
    let emailSent;

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
      console.log(paymentIntent);
      console.log(`💰 PaymentIntent status: ${paymentIntent.status}`);
    } else if (event.type === "payment_intent.payment_failed") {
      const paymentIntent = event.data.object as Stripe.PaymentIntent;
      //console.log(paymentIntent);
      console.log(
        `❌ Payment failed: ${paymentIntent.last_payment_error?.message}`
      );
    } else if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;
      const { line_items } = await stripe.checkout.sessions.retrieve(
        session.id,
        {
          expand: ["line_items"],
        }
      );
      console.log(session.customer_email);
      console.log(line_items);
      //console.log(session);
      console.log(`💵 Session id: ${session.id}`);
      const sliceDescription = line_items.data[0].description;
      const artistAlias = sliceDescription.substring(
        0,
        sliceDescription.length - 6
      );

      console.log(artistAlias);
      //const queryLimitedSlices = 'UPDATE slices SET user_id = (SELECT id FROM users WHERE email = $1) WHERE id IN (SELECT id FROM slices WHERE user_id IS NULL AND artist_id = (SELECT id FROM artists WHERE artist_alias = $2)  LIMIT 1'
      const query =
        "INSERT INTO slices (user_id,artist_id) VALUES((SELECT id FROM users WHERE email = $1),(SELECT id FROM artists WHERE artist_alias = $2))";
      await pool.query(
        query,
        [session.customer_email, artistAlias],
        async (error, results) => {
          if (error) {
            throw error;
          } else {
            try {
              let info = await axios.post(
                `${process.env.NEXTAUTH_URL}/api/slicepurchaseemail`,
                {
                  email: session.customer_email,
                  artist_alias: artistAlias,
                }
              );
              if (info) emailSent = true;
            } catch (err) {
              emailSent = false;
            }
          }
        }
      );
    } else {
      console.warn(`🤷‍♀️ Unhandled event type: ${event.type}`);
    }

    // Return a response to acknowledge receipt of the event.
    res.json({ received: true, emailSent });
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
};

export default cors(webhookHandler as any);
