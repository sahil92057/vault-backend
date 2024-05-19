const jwt = require("jsonwebtoken");
const { JWT_SECRET_KEY } = require("../config/serverConfig");
function authenticateToken(req, res, next) {
  try {
    const token = req.headers["x-access-token"];
    console.log("HEADERSTOKEN", token);
    if (!token) {
      throw new Error("No Token Found");
    }
    const decoded = jwt.verify(token, JWT_SECRET_KEY);
    console.log("decoded", decoded);
    req.address = decoded.address;
    next();
  } catch (error) {
    res.satus(200).json({ status: "Error", message: error.message });
  }
}
module.exports = { authenticateToken };
