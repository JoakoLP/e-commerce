const { check } = require("express-validator");

const checksRegister = [
  check("email").not().isEmpty().withMessage("Email is required.").bail().isEmail().withMessage("Must be a valid email address."),
  check("password").not().isEmpty().withMessage("Password is required.").bail().isString().withMessage("Password must be a string."),
  check("name").not().isEmpty().withMessage("Username is required.").bail().isString().withMessage("Username must be a string."),
];

const checksLogin = [
  check("email").not().isEmpty().withMessage("Email is required.").bail().isEmail().withMessage("Must be a valid email address."),
  check("password").not().isEmpty().withMessage("Password is required.").bail().isString().withMessage("Password must be a string."),
];

module.exports = { checksRegister, checksLogin };
