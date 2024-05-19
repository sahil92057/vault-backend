const ethers = require("ethers");
const userModel = require("../models/User");
const { JWT_SECRET_KEY } = require("../config/serverConfig");
const jwt = require("jsonwebtoken");
module.exports = {
  authController: async (req, res) => {
    try {
      console.log("reqsahil", req.body, req.query);
      const { signature } = req.body;
      const { address } = req.query;
      if (!signature) throw new Error("Signature is invalid");
      const recoveredAddress = ethers.utils.verifyMessage(
        "Welcome to Crypto Wallet Website",
        signature
      );
      if (address.toLowerCase() === recoveredAddress.toLowerCase()) {
        const address = recoveredAddress.toLowerCase();
        const user = await userModel.findOne({ userAddress: address });
        if (!user) {
          const userData = await userModel.create({ userAddress: address });
          console.log("userData", userData);
        }
        const token = jwt.sign({ address }, JWT_SECRET_KEY);
        console.log("token", token);
        res.status(200).json({ message: "Authentication Success", token });
      } else {
        res.status(400).json({ message: "Authentication Failed" });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json | { message: "Internal Server Error" };
    }
  },
};
