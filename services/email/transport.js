import nodemailer from "nodemailer";

require("dotenv").config();

const sendMail = async ({ to, subject, text, html, account }) => {
  return new Promise((resolve, reject) => {
    let message = {
      to,
      subject,
      text,
      html,
    };

    let transporter = nodemailer.createTransport(
      {
        host: account.smtp.host,
        port: account.smtp.port,
        secure: account.smtp.secure,
        auth: {
          user: account.user,
          pass: account.pass,
        },
        logger: process.env.NODE_ENV === "development",
        transactionLog: true,
        allowInternalNetworkInterfaces: false,
      },
      {
        from: "EventSphere Bookings <bookings@eventsphere.com>",
      }
    );

    transporter.sendMail(message, (error, info) => {
      if (error) {
        console.log("Error occurred");
        console.log(error.message);
        reject(error);
      }

      console.log("Message sent successfully!");
      console.log(nodemailer.getTestMessageUrl(info));
      resolve(info);
    });
  });
};

export default sendMail;
