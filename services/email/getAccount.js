import nodemailer from "nodemailer";

const getEmailAccount = async () => {
  return new Promise((resolve, reject) => {
    // This should be replaced with actual user email id and password
    // As of now, it is a dummy account and enough for Airtribe test
    nodemailer.createTestAccount((err, account) => {
      if (err) {
        console.error("Failed to create a testing account");
        console.error(err);
        reject(err);
      }
      resolve(account);
    });
  });
};

export default getEmailAccount;
