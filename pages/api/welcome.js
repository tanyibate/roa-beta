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
      subject: "Welcome to Roa", // Subject line
      text:
        "Hey there,First off, We’d like to extend a warm welcome and ‘thank you’ for joining the ROA beta. We recognize that your time is valuable and we're seriously flattered that you chose to join us. Please visit the beta at roabeta.com to check out the slices you can buy from our amazing artists and watch our platform  for any upcoming arrivals with our artists! If you need anything, please feel free to give us a shout at contact@rogueonarrival.com. Again, welcome! Best, ROA", // plain text body
      html:
        "<body><p>Hey there,</p><p>First off, We’d like to extend a warm welcome and ‘thank you’ for joining the ROA beta. We recognize that your time is valuable and we're seriously flattered that you chose to join us. Please visit the beta at roabeta.com to check out the slices you can buy from our amazing artists and watch our platform  for any upcoming arrivals with our artists! If you need anything, please feel free to give us a shout at contact@rogueonarrival.com. Again, welcome!</p><p>Best,</p> <p>ROA</p></body>", // html body
    });
    res.status(200).json(info);
  }
};
