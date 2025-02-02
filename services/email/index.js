const sendMail = require("./transport");
const getAccount = require("./getAccount");
const logger = require("../../utils/logger");

const emailContent = {
  to: "customer@eventsphere.com",
  from: "support@eventsphere.com",
  subject: "Booking Confirmed",
  html: "You have successfully booked for the event",
};

getAccount()
  .then((account) => {
    sendMail({ ...emailContent, account });
  })
  .catch((err) => {
    logger.error("Failed to send email");
    logger.error(err);
  });

sendMail(emailContent);
