const { check } = require("express-validator");

const checksChange = {
  name: [check("name").not().isEmpty().withMessage("Name is required.").isString().withMessage("Name must be a string.")],
  email: [check("email").not().isEmpty().withMessage("Email is required.").isEmail().withMessage("Email must be a string.")],
  pass: [check("pass").not().isEmpty().withMessage("Password is required.").isString().withMessage("Password must be a string.")],
};

module.exports = checksChange;
