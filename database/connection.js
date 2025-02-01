const mongoose = require("mongoose");
const logger = require("../utils/logger");

const mongoConnection = async () => {
  const maxRetries = 5;
  let retries = 0;

  while (retries < maxRetries) {
    try {
      await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      logger.info("Connected to MongoDB");
      break;
    } catch (error) {
      retries += 1;
      logger.error(
        `Error connecting to MongoDB (attempt ${retries}): ${error.message}`
      );
      if (retries < maxRetries) {
        logger.info(`Retrying to connect in 5 seconds...`);
        await new Promise((resolve) => setTimeout(resolve, 5000));
      } else {
        logger.error("Max retries reached. Could not connect to MongoDB.");
        process.exit(1);
      }
    }
  }
};

module.exports = mongoConnection;