require("dotenv").config();

module.exports = {
  MONGODB_URL: process.env.MONGODB_URL,
  PORT: process.env.PORT,
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
  PINATA_API_KEY: process.env.PINATA_API_KEY,
  PINATA_JWT_KEY: process.env.PINATA_JWT_KEY,
};
