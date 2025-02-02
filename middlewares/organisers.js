const logger = require("../utils/logger");

const organiserMiddleware = (req, res, next) => {
  if (req?.user?.userType !== "organizer") {
    return res.status(403).send({
      error: "Forbidden",
      message: "Only organizers are allowed to access events",
    });
  }
  return next();
};

module.exports = organiserMiddleware;
