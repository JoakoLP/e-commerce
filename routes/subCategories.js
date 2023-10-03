const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/categoryController");
const { verifyToken, isAdmin } = require("../middlewares/userChecks");

// SubsCategories
router.post("/add", verifyToken, isAdmin, categoryController.SubCategoryAdd);
router.get("/get", categoryController.SubCategoryGet);
router.put("/edit", verifyToken, isAdmin, categoryController.SubCategoryEdit);
router.delete("/delete", verifyToken, isAdmin, categoryController.SubCategoryDel);

module.exports = router;
