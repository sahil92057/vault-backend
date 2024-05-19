const express = require("express");
const {
  uploadImageController,
} = require("../controller/uploadImageController");
const { UploadUserImage } = require("../middleware/multer");
const { authenticateToken } = require("../middleware/authenticateToken");
const router = express.Router();

router.post(
  "/uploadImage",
  authenticateToken,
  UploadUserImage,
  uploadImageController
);
module.exports = router;
