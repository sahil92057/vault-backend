const express = require("express");
const { getImageController } = require("../controller/getImageController");
const { authenticateToken } = require("../middleware/authenticateToken");
const router = express.Router();

router.post("/getImage", authenticateToken, getImageController);
module.exports = router;
