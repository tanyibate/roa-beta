import pool from "../../postgres.config";
import crypto from "crypto";
const nodemailer = require("nodemailer");

export default async (req, res) => {
  if (req.method === "POST") {
    const email = req.body.email;
    const token = crypto.randomBytes(20).toString("hex");
    var d = new Date();
    var n = d.getTime();
    const expiry_time = (n + 300000).toString();
    pool.query(
      "INSERT INTO password_reset_tokens (token, expiry_time, user_id) VALUES ($1,$2,(SELECT id FROM users WHERE email=$3))",
      [token, expiry_time, email]
    );
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
    let info = await transporter.sendMail({
      from: '"ROA" <noreply@rogueonarrival.com>', // sender address
      to: email, // list of receivers
      subject: "Reset Password", // Subject line
      text:
        `Looks like you've forgotten your password, we've all been here before \n` +
        `Click or copy paste this link to reset your password \n` +
        `${process.env.NEXT_PUBLIC_APP_URL}/resetpassword/${token} \n` +
        `You'll have 5 miuntes to click on this link before the link expires`,

      // plain text body
    });
    res.status(200).json(info);
  }
};
