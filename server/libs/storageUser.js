const multer = require("multer");
const path = require("path");

// file handler middleware
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./storage/img/users/");
  },
  filename: (req, file, cb) => {
    cb(null, `user-${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
  },
});
const upload = multer({ storage });

module.exports = upload;
