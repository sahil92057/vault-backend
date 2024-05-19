const ethers = require("ethers");
const userModel = require("../models/User");
const {
  PINATA_KEY,
  PINATA_SECRETKEY,
  PINATA_JWT_KEY,
} = require("../config/serverConfig");
const pinataSDK = require("@pinata/sdk");
const { generateEncryptionKey } = require("../utils/generateKey");
const { encryptFile } = require("../utils/encryption");

module.exports = {
  uploadImageController: async (req, res, next) => {
    try {
      console.log("res", res);
      console.log("filesahil", req.file);
      const address = req.address;
      const userAddress = address.toLowerCase();
      const user = await userModel.findOne({ userAddress: userAddress });
      if (!user) {
        throw new Error("User does not exist");
      }
      if (user.encryptionKey === null) {
        const encryptionKey = generateEncryptionKey(32);
        user.encryptionKey = encryptionKey;
        await user.save();
      }
      const { encryptedData, iv } = encryptFile(
        req.file.buffer,
        user.encryptionKey
      );

      const pinata = new pinataSDK({ pinataJWTKey: PINATA_JWT_KEY });
      var ipfsHash = "";

      const resd = await pinata.testAuthentication();
      console.log("res", resd);
      pinata
        .pinJSONToIPFS({ encryptedData, iv })
        .then((resd) => {
          console.log("res", resd);
          // ipfsHash =
          res.status(200).json({
            status: "success",
            message: "Uploaded Successfully",
            ipfsHash: resd.IpfsHash,
          });
        })
        .catch((err) => {
          console.log("err", err.message);
          throw new Error("Internal Server Error");
        });
      // const pinataData = await pinata.pinJSONToIPFS({ encryptedData, iv });
      // console.log("ververv", pinataData);
    } catch (error) {
      console.log("saerr", error);
      res
        .status(200)
        .json({ status: "Error", message: "Internal Server Error" });
    }
  },
};
