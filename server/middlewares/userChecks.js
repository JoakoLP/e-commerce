const { User } = require("../models/user");
const { tokenVerify } = require("../utils/jwt");
const fs = require("fs");

const isRegistered = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      if (req.files[0]) {
        // console.log(req.files[0]);
        const { path, filename } = req.files[0];
        fs.unlinkSync(path, filename);
      }
      res.status(500).send("Email ya registrado.");
    } else {
      const user = await User.findOne({ username: req.body.username });
      if (user) {
        if (req.files[0]) {
          // console.log(req.files[0]);
          const { path, filename } = req.files[0];
          fs.unlinkSync(path, filename);
        }
        res.status(500).send("Usuario ya registrado.");
      } else {
        next();
      }
    }
  } catch (error) {
    res.json(error);
  }
};

const isNotRegistered = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user == null) {
      res.status(500).send("Email no registrado.");
    } else {
      next();
    }
  } catch (error) {
    res.json(error);
  }
};

const isLogged = (req, res, next) => {
  try {
    if (req.cookies.userSession) {
      if (req.files) {
        console.log(req.files[0]);
        const { path, filename } = req.files[0];

        // console.log(path);
        fs.unlinkSync(path, filename);
      }
      res.status(501).send("Ya has iniciado sesión.");
    } else {
      next();
    }
  } catch (error) {
    res.json(error);
  }
};

const isNotLogged = (req, res, next) => {
  try {
    // console.log(req.cookies);
    // console.log(req);
    // if (!req.cookies.userSession) {
    if (!req.cookies.userSession) {
      res.status(500).send("Primero debes iniciar sesión.");
    } else {
      next();
    }
  } catch (error) {
    res.json(error);
  }
};

const verifyToken = (req, res, next) => {
  try {
    // console.log(req.headers);
    // const bearerHeader = req.headers["authorization"];

    const bearerHeader = req.cookies.authorization;

    // const bearerHeader = req.headers;
    console.log(bearerHeader);
    if (typeof bearerHeader !== undefined) {
      const bearerToken = bearerHeader.split(" ")[1];
      req.token = bearerToken;
      next();
    } else {
      res.status(403);
    }
  } catch (error) {
    res.json(error);
  }
};

const isAdmin = async (req, res, next) => {
  try {
    const decoded = tokenVerify(req.token);
    const user = await User.findById(decoded.body._id);
    if (user?.isAdmin == true) {
      next();
    } else {
      res.send("Debes ser admin.");
    }
  } catch (error) {
    res.json(error);
  }
};

module.exports = { isRegistered, isNotRegistered, isLogged, isNotLogged, verifyToken, isAdmin };
