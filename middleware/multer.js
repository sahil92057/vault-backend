const multer = require("multer");
const storage = () => multer.memoryStorage();

module.exports = {
  UploadUserImage: multer({ storage: storage() }).single("file"),
};
