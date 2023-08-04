const { User } = require("../models/user");
const { tokenVerify } = require("../utils/jwt");
const fs = require("fs");

const isRegistered = async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (user) {
    if (req.files[0]) {
      // console.log(req.files[0]);
      const { path, filename } = req.files[0];
      fs.unlinkSync(path, filename);
    }
    res.status(500).send("Email already registered.");
  } else {
    next();
  }
};

const isNotRegistered = async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (user == null) {
    res.status(500).send("Email not registered.");
  } else {
    next();
  }
};

const isLogged = (req, res, next) => {
  if (req.cookies.userSession) {
    if (req.files) {
      console.log(req.files[0]);
      const { path, filename } = req.files[0];

      // console.log(path);
      fs.unlinkSync(path, filename);
    }
    res.status(501).send("Already logged in.");
  } else {
    next();
  }
};

const isNotLogged = (req, res, next) => {
  if (!req.cookies.userSession) {
    res.status(501).send("You need to login first.");
  } else {
    next();
  }
};

const verifyToken = (req, res, next) => {
  const bearerHeader = req.headers["authorization"];
  // const bearerHeader = req.headers;
  // console.log(bearerHeader);
  if (typeof bearerHeader !== undefined) {
    const bearerToken = bearerHeader.split(" ")[1];
    req.token = bearerToken;
    next();
  } else {
    res.status(403);
  }
};

const isAdmin = async (req, res, next) => {
  const decoded = tokenVerify(req.token);
  const user = await User.findById(decoded.body._id);
  if (user?.isAdmin == true) {
    next();
  } else {
    res.json({ msg: "User is not admin" });
  }
};

module.exports = { isRegistered, isNotRegistered, isLogged, isNotLogged, verifyToken, isAdmin };
