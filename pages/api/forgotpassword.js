// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const nodemailer = require("nodemailer");

export default async (req, res) => {
  if (req.method === "POST") {
    let transporter = nodemailer.createTransport({
      host: "email-smtp.us-east-2.amazonaws.com",
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: "AKIATXTAIET2O73JHHP6",
        pass: "BNJLkRUml/I1jxyAZN57/Rm6LG2KvCsmN7keBuD1k3AY",
      },
    });
    // send mail with defined transport object
    const email = req.body.email;
    let info = await transporter.sendMail({
      from: '"ROA" <noreply@rogueonarrival.com>', // sender address
      to: email, // list of receivers
      subject: "Hello ✔", // Subject line
      text: "Hello world?", // plain text body
      html: "<b>Hello world?</b>", // html body
    });
    res.status(200).json(info);
  }
};
