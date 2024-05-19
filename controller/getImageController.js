const ethers = require("ethers");
const userModel = require("../models/User");
const {
  PINATA_KEY,
  PINATA_SECRETKEY,
  PINATA_JWT_KEY,
} = require("../config/serverConfig");
const pinataSDK = require("@pinata/sdk");
const { generateEncryptionKey } = require("../utils/generateKey");
const { decryptData } = require("../utils/decryption");
const { default: axios } = require("axios");

async function returnIpfsResponse(ipfsHash) {
  const PINATA_GATEWAY_URL = "https://gateway.pinata.cloud/ipfs/";
  const response = await axios(`${PINATA_GATEWAY_URL}${ipfsHash}`);
  return response.data;
}
module.exports = {
  getImageController: async (req, res, next) => {
    try {
      console.log("res", req.body);
      const address = req.address;
      const userAddress = address.toLowerCase();
      const user = await userModel.findOne({ userAddress: userAddress });
      if (!user) {
        throw new Error("User does not exist");
      }
      const { page, limit } = req.query;
      const pageNumber = parseInt(page) || 1;
      const limitNumber = parseInt(limit) || 1;
      console.log("pageNumber", pageNumber, "limitNumber", limitNumber);
      if (pageNumber < 1 || limitNumber < 1) {
        throw new Error("Pagination issue");
      }
      const startIndex = 2 + (pageNumber - 1) * limitNumber;
      const endIndex = 2 + pageNumber * limitNumber;
      const ipfsHashArray = req.body.slice(
        startIndex,
        Math.min(req.body.length, endIndex)
      );
      console.log("ipfsHashArray", ipfsHashArray);
      const decryptedImageArray = [];
      if (ipfsHashArray.length != 0) {
        const encryptedData = await Promise.all(
          ipfsHashArray.map(async (ipfsHash) => {
            const res = await returnIpfsResponse(ipfsHash);
            return res;
          })
        );
        console.log("encryptedData", encryptedData);

        for (const img of encryptedData) {
          const decryptedImageData = decryptData(
            img.encryptedData,
            img.iv,
            user.encryptionKey
          );
          decryptedImageArray.push(decryptedImageData.toString("base64"));
        }
      }
      console.log("decryptedImageArray", decryptedImageArray);
      console.log("fcedcdec", ipfsHashArray);
      res.status(200).json({ status: "Image sent", decryptedImageArray });
    } catch (error) {
      console.log("saerr", error);
      res
        .status(200)
        .json({ status: "Error", message: "Internal Server Error" });
    }
  },
};
