const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/categoryController");
const { verifyToken, isAdmin } = require("../middlewares/userChecks");

// Categories
router.post("/add", verifyToken, isAdmin, categoryController.CategoryAdd);
router.get("/get", categoryController.CategoryGet);
router.put("/edit", verifyToken, isAdmin, categoryController.CategoryEdit);
router.delete("/delete", verifyToken, isAdmin, categoryController.CategoryDel);

module.exports = router;
