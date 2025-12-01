const { rateLimit } = require("express-rate-limit");
const { StatusCodes } = require("http-status-codes");
const { ErrorResponse } = require("../utils/common");

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 1000,
  keyGenerator: (req) => {
    return req.ip; // Use IP address as the key
  },
  handler: (req, res) => {
    res.status(StatusCodes.TOO_MANY_REQUESTS).json({
      ...ErrorResponse,
      error: "Too many requests, please try again later.",
    });
  },
  skip: (req) => {
    // Avoid skiping rate limiting
  },
  standardHeaders: true,
  legacyHeaders: false,
});

module.exports = { limiter };
