// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import pool from "../../postgres.config";
const nodemailer = require("nodemailer");

export default async (req, res) => {
  if (req.method === "POST") {
    const { artist_alias, email } = req.body;
    pool
      .query("SELECT * FROM artists WHERE artist_alias = $1", [artist_alias])
      .then(async (results) => {
        if (results.rows.length) {
          const artist = results.rows[0];
          let transporter = nodemailer.createTransport({
            host: "email-smtp.us-east-2.amazonaws.com",
            port: 465,
            secure: true, // true for 465, false for other ports
            auth: {
              user: process.env.EMAIL_USER,
              pass: process.env.EMAIL_PASSWORD,
            },
          });
          // send mail with defined transport object
          let info;
          try {
            info = await transporter.sendMail({
              from: '"ROA" <noreply@rogueonarrival.com>', // sender address
              to: email, // list of receivers
              subject: `Welcome to ${artist.artist_alias}'s neighborhood`, // Subject line
              text: `${artist.artist_welcome_email_text}`,
              html: `<body>${artist.artist_welcome_email_html}</body>`, // html body
            });
          } catch (err) {
            info = { success: false };
          }
          res.status(200).json(info);
        }
      })
      .catch(() => {
        res.status(400).send("error sending email");
      });
  }
};
