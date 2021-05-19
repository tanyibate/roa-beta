import { getSession, session } from "next-auth/client";
import pool from "../../postgres.config";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export default async (req, res) => {
  const authSession = await getSession({ req });
  if (authSession) {
    const query =
      "SELECT moo.total_number_of_slices,foo.num_of_slices_of_artist,noo.remaining_slices, boo.level,boo.referral_code FROM (SELECT COUNT(user_id) AS total_number_of_slices FROM slices WHERE user_id = (SELECT id from users where email = $1)) AS moo, (SELECT COUNT(user_id) AS num_of_slices_of_artist FROM slices WHERE user_id = (SELECT id from users where email = $1) AND artist_id = (SELECT id from artists where artist_alias = $2)) as foo, (SELECT COUNT(*) AS remaining_slices FROM slices WHERE artist_id = (SELECT id from artists where artist_alias = $2) AND user_id IS NULL) AS noo, (SELECT level,referral_code FROM users WHERE id = (SELECT id from users where email = $1)) AS boo";
    if (req.method === "POST") {
      pool.query(
        query,
        [authSession.user.email, req.body.artistAlias],
        async (error, result) => {
          console.log(result.rows[0]);
          if (result) {
            var d1 = new Date();
            var d2 = new Date("2021-05-06T16:15:00");
            if (result.rows[0].total_number_of_slices >= 2) {
              res.json({
                message:
                  "You have bought the maximum number of slices for the beta, thank you for your participation, have a lookout on the Arrivals page for interactions with our artists.",
                maxSlices: true,
                outOfStock: false,
                level: result.rows[0].level,
                referral_code: result.rows[0].referral_code,
              });
            } /*else if (
              result.rows[0].remaining_slices === 0 ||
              !result.rows[0].remaining_slices
            ) {
              console.log("No slices left of artist");
              res.json({
                message:
                  "No slices left of this artist :(, check out all our other amazing artists.",
                maxSlices: false,
                outOfStock: true,
                level: result.rows[0].level,
                referral_code: result.rows[0].referral_code,
              });
            }*/ else if (
              result.rows[0].num_of_slices_of_artist >= 1
            ) {
              res.json({
                message: `Let's not be too excited ;) and let someone else buy a slice of ${req.body.artistAlias} check out all our other amazing artists.`,
                maxSlices: true,
                outOfStock: false,
                level: result.rows[0].level,
                referral_code: result.rows[0].referral_code,
              });
            } else if (
              result.rows[0].total_number_of_slices > 0 &&
              result.rows[0].level < 3
            ) {
              let message =
                result.rows[0].level > 1
                  ? `What's a neighborhood without your friends. Refer ${
                      3 - result.rows[0].level
                    } friend to buy another slice!`
                  : `What's a neighborhood without your friends. Refer ${
                      3 - result.rows[0].level
                    } friends to buy another slice!`;
              res.json({
                message,
                maxSlices: true,
                outOfStock: false,
                level: result.rows[0].level,
                referral_code: result.rows[0].referral_code,
              });
            } else {
              try {
                const YOUR_DOMAIN = process.env.NEXTAUTH_URL;
                const request = req.body;
                const artist_alias = req.body.artistAlias;
                console.log(`${YOUR_DOMAIN}/success/` + artist_alias);
                const session = await stripe.checkout.sessions.create({
                  customer_email: authSession.user.email,
                  success_url:
                    `${YOUR_DOMAIN}/success/` +
                    artist_alias.replace(" ", "%20"),
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
          } else {
            res.status(403).json({ message: "connection failed" });
          }
        }
      );
    }
  } else {
    // Not Signed in
    res.status(401);
  }
};
