const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

// middlewares
const { checksRegister, checksLogin } = require("../middlewares/inputChecks");
const { checksValidation } = require("../middlewares/checksValidation");
const { isRegistered, isNotRegistered, isLogged, isNotLogged, verifyToken, isAdmin } = require("../middlewares/userChecks");
const checkChange = require("../middlewares/checksChange");
const upload = require("../libs/storageUser");

router.post("/", userController.index);
router.post("/register", upload.any(), isLogged, isRegistered, checksRegister, checksValidation, userController.register);
router.post("/login", isLogged, isNotRegistered, checksLogin, checksValidation, userController.login);
router.delete("/logout", isNotLogged, userController.logout);
router.delete("/unregister", isNotLogged, userController.unregister);
router.get("/userList", verifyToken, isAdmin, userController.userList);
router.get("/userGet", isNotLogged, verifyToken, userController.userGet);
router.get("/userStatus", isNotLogged, verifyToken, userController.userStatus);
// router.get("/userGet", userController.userGet);

module.exports = router;
