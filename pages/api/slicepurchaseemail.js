// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import pool from "../../postgres.config";
const nodemailer = require("nodemailer");

export default async (req, res) => {
  if (req.method === "POST") {
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
    const email = req.body.email;
    let info;
    try {
      info = await transporter.sendMail({
        from: '"ROA" <noreply@rogueonarrival.com>', // sender address
        to: email, // list of receivers
        subject: "Welcome to Roa", // Subject line
        text:
          "This is ROA.  This is a neighborhood where, as Lil Wayne says, we welcome people who “...like being misunderstood.”  This is the end all be all platform for what it means to be a music fan.  This is the inner circle you have now joined.", // plain text body
        html:
          "<body><p>This is ROA. &nbsp;This is a neighborhood where, as Lil Wayne says, we welcome people who &ldquo;...like being misunderstood.&rdquo; &nbsp;This is the end all be all platform for what it means to be a music fan. &nbsp;This is the inner circle you have now joined.</p><p><br></p></body>", // html body
      });
    } catch (err) {
      info = { success: false };
    }
    res.status(200).json(info);
  }
};
