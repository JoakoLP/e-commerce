const jwt = require("jsonwebtoken");
require("dotenv").config();

// const token = token60({ ...req.session.user });
const token60 = (body) => {
  const payload = { body };
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "60s" });
};

const tokenRemember = (body) => {
  const payload = { body };
  return jwt.sign(payload, process.env.JWT_SECRET);
};

const tokenVerify = (token) => {
  // console.log(token);
  return jwt.verify(token, process.env.JWT_SECRET);
};

module.exports = { token60, tokenRemember, tokenVerify };
