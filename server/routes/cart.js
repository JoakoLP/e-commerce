const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cartController");

const { isLogged, isNotLogged, verifyToken } = require("../middlewares/userChecks");

router.get("/getCart", isNotLogged, verifyToken, cartController.getCart);
router.post("/add/:id", isNotLogged, verifyToken, cartController.addToCart);
router.put("/delete-item/:id", isNotLogged, verifyToken, cartController.deleteFromCart);
router.delete("/delete-all-items/:id", isNotLogged, verifyToken, cartController.deleteAllItems);
router.delete("/clear", isNotLogged, verifyToken, cartController.clearCart);

module.exports = router;
