import pool from "../../postgres.config";
import crypto from "crypto";
const nodemailer = require("nodemailer");
import { getSession, session } from "next-auth/client";
import axios from "axios";

export default async (req, res) => {
  if (req.method === "POST") {
    const {
      email,
      name,
      query,
      media_link,
      message,
      recaptchaResponse,
    } = req.body;
    const authSession = await getSession({ req });
    console.log(message);
    let realPerson = false;
    if (authSession) {
      realPerson = true;
    } else {
      try {
        console.log(recaptchaResponse);
        let recaptchaSuccessData = await axios.post(
          `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${recaptchaResponse}`
        );
        console.log(recaptchaSuccessData.data.success);
        realPerson = recaptchaSuccessData.data.success;
      } catch (err) {
        console.log(err);
        realPerson = false;
      }
    }

    if (realPerson) {
      pool
        .query(
          "INSERT INTO tickets (email, name, query,media_link,message) VALUES ($1,$2,$3,$4,$5)",
          [email, name, query, media_link, message]
        )
        .then(async (results) => {
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
          try {
            let info = await transporter.sendMail({
              from: '"ROA" <contact@rogueonarrival.com>', // sender address
              to: email, // list of receivers
              subject: "Thank you", // Subject line
              text: `Thank you for making us aware of your query we'll try to answer it in the shortest amount of time possible `,

              // plain text body
            });
            let adminemail = await transporter.sendMail({
              from: `"${name}" <${email}>`, // sender address
              to: "contact@rogueonarrival.com", // list of receivers
              subject: query, // Subject line
              text: message,

              // plain text body
            });
            res.status(200).json({
              adminemail,
              info,
            });
          } catch (err) {
            console.log(err);
            res.status(400).send("There was an error with sending the email");
          }
        })
        .catch((err) => {
          res.status(400).send("There was an error with sending the email");
        });
    } else {
      res.status(400).send("There was an error with sending the email");
    }
  }
};
