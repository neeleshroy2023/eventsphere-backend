const jwt = require("jsonwebtoken");
const { PUBLIC_ENDPOINTS } = require("../utils/publicEndpoints");
const logger = require("../utils/logger");
require("dotenv").config();

const authMiddleware = (req, res, next) => {
  if (PUBLIC_ENDPOINTS.includes(req.path)) {
    logger.info(`Public endpoint accessed: ${req.path}`);
    return next();
  }
  const token = req?.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    logger.warn("No token provided");
    return res.status(401).send({ error: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    logger.info(`Token verified for user: ${decoded.email}`);
    return next();
  } catch (err) {
    logger.error("Invalid token");
    return res.status(401).send({ error: "Invalid token" });
  }
};

module.exports = authMiddleware;
