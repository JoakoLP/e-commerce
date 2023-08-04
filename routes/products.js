const express = require("express");
const router = express.Router();
const productsController = require("../controllers/productsController");
const upload = require("../libs/storageProduct");
const { verifyToken, isAdmin } = require("../middlewares/userChecks");

router.post("/add", verifyToken, isAdmin, upload.any(), productsController.productAdd);
router.get("/get", productsController.productGet);
router.put("/edit", verifyToken, isAdmin, upload.any(), productsController.productEdit);
router.delete("/delete/:id", verifyToken, isAdmin, productsController.productDel);
router.get("/search", productsController.productSearch);

module.exports = router;
