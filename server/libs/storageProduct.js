const multer = require("multer");
const path = require("path");

// file handler middleware
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./storage/img/products/");
  },
  filename: (req, file, cb) => {
    cb(null, `product-${req.body.prod_id || req.body.product.prod_id}-${Date.now()}${path.extname(file.originalname)}`);
  },
});
const upload = multer({ storage });

module.exports = upload;
