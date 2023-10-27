const bcrypt = require("bcryptjs");
const { User } = require("../models/user");
const { token60, tokenRemember, tokenVerify } = require("../utils/jwt");
const path = require("path");
const { cloudinary } = require("../utils/cloudinary");

const SERVER_URL = "https://e-commerce-api.joaquintakara.com";
// const SERVER_URL = "http://localhost:8080";

const DOMAIN_URL = ".joaquintakara.com";
// const DOMAIN_URL = "";

const uploadFile = async (req, user) => {
  if (req.files[0]) {
    console.log("hay foto");
    try {
      if (user) {
        // console.log({ user });
        const b64 = Buffer.from(req.files[0].buffer).toString("base64");
        let fileStr = "data:" + req.files[0].mimetype + ";base64," + b64;
        // console.log(fileStr);
        const uploadedResponse = await cloudinary.uploader.upload(fileStr, {
          public_id: `users/${req.body.username}`,
          upload_preset: "e-commerce",
        });
        user.setImgUrl(uploadedResponse.url);
        await user.save();
      } else {
        console.log("No hay usuario?");
      }
      // res.status(201).json({ user: { ...req.session.user }, msg: "User registered succesfully." });
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  } else {
    console.log("no hay foto");
    await user.save();
  }
};

const deleteImage = async (avatar) => {
  try {
    const filename = path.basename(avatar);
    console.log({ filename });
    const onlyName = filename.split(".")[0];
    console.log({ onlyName });
    await cloudinary.uploader.destroy(`e-commerce/users/${onlyName}`).then((res) => {
      console.log(res);
    });
  } catch (error) {
    console.log(error);
  }
};

class UserController {
  async index(req, res) {
    console.log("Información recibida:");
    console.log(req.body);
    console.log(Date.now());
    console.log(new Date());
    console.log(new Date(Date.now()));
    res.status(200).json({
      msg: "a",
    });
  }

  async login(req, res) {
    try {
      const user = await User.findOne({ email: req.body.email });
      if (!bcrypt.compareSync(req.body.password, user.password)) {
        res.status(500).json("Contraseña incorrecta.");
      } else {
        let { _id, username, name, email, isAdmin, avatar, date } = user._doc;
        req.session.user = { _id, username, name, email, isAdmin, avatar, date };
        const token = `Bearer ${req.body.remember ? tokenRemember({ ...req.session.user }) : token60({ ...req.session.user })}`;
        res.cookie(
          "authorization",
          `Bearer ${token}`,
          req.body.remember ? { sameSite: "none", secure: true, domain: DOMAIN_URL } : { maxAge: 60000, sameSite: "none", httpOnly: true, secure: true, domain: DOMAIN_URL }
        );
        res.cookie(
          "userSession",
          { ...req.session.user },
          req.body.remember ? { sameSite: "none", secure: true, domain: DOMAIN_URL } : { maxAge: 60000, sameSite: "none", secure: true, domain: DOMAIN_URL }
        );

        await User.findByIdAndUpdate(user._id, { lastSeen: new Date() });

        console.log(`${user.name} login`);
        res.status(201).json({
          user: { ...req.session.user },
          msg: "Logged in!",
          // token,
        });
      }
    } catch (error) {
      // console.log(error.response.data);
      res.status(400).json(error);
    }
  }

  async logout(req, res) {
    try {
      const user = await User.findById(req.cookies.userSession._id);
      console.log(`${user?.name} logout`);
      res.clearCookie("userSession", { domain: DOMAIN_URL });
      res.clearCookie("authorization", { domain: DOMAIN_URL });

      await User.findByIdAndUpdate(user._id, { lastSeen: new Date() });
      req.session.destroy();
      res.status(201).json({
        msg: "Session closed.",
      });
    } catch (error) {
      res.json(error);
    }
  }

  async register(req, res, next) {
    try {
      console.log(req.files[0]);
      const salt = bcrypt.genSaltSync(8);
      const passwordHash = bcrypt.hashSync(req.body.password, salt);
      // const now = new Date(Date.now());
      let user = new User({
        username: req.body.username,
        name: req.body.name,
        email: req.body.email,
        password: passwordHash,
        isAdmin: false,
        avatar: `${SERVER_URL}/public/default/user-avatar.png`,
        lastSeen: new Date(),
        // avatar: "http://localhost:8080/public/default/user-avatar.png",
        cart: { products: [], total: 0, count: 0 },
      });

      await uploadFile(req, user);
      user = await User.findById(user?._id).then(() => {
        // console.log({ user });
        let { _id, username, name, email, isAdmin, avatar, date } = user._doc;
        console.log({ avatar });
        req.session.user = { _id, username, name, email, isAdmin, avatar, date };
      });

      const token = token60({ ...req.session.user });

      res.cookie(
        "authorization",
        `Bearer ${token}`,
        req.body.remember ? { sameSite: "none", secure: true, domain: DOMAIN_URL } : { maxAge: 60000, sameSite: "none", httpOnly: true, secure: true, domain: DOMAIN_URL }
      );
      // res.cookie("authorization", `Bearer ${token}`, { maxAge: 60000, sameSite: "none", secure: true, httpOnly: true });
      // res.cookie("userSession", { ...req.session.user }, { maxAge: 60000, sameSite: "none", secure: true });

      res.cookie(
        "userSession",
        { ...req.session.user },
        req.body.remember ? { sameSite: "none", secure: true, domain: DOMAIN_URL } : { maxAge: 60000, sameSite: "none", secure: true, domain: DOMAIN_URL }
      );
      // res.cookie("userSession", { ...req.session.user, remember: false }, { maxAge: 60000, sameSite: "none", secure: true });

      console.log(`${user.name} register`);
      res.status(201).json({ user: { ...req.session.user }, msg: "User registered succesfully." });
    } catch (error) {
      res.json(error);
    }
  }

  async unregister(req, res) {
    try {
      // console.log(req.body);
      const user = await User.findById(req.cookies.userSession._id);

      // const user = req.cookies.userSession;
      // console.log("aca");
      console.log(user);

      await User.findByIdAndDelete(user._id).then((res) => {
        if (user?.avatar) {
          // console.log(user.avatar);
          deleteImage(user.avatar);
        }
        console.log(`${user.name} unregister`);
        res.status(201).json({ msg: "User deleted." });
      });
    } catch (error) {
      res.json(error.response);
    }
  }

  async userList(req, res) {
    try {
      const userList = await User.find({});
      res.json(userList);
    } catch (error) {
      console.log(error);
    }
  }

  async userGet(req, res) {
    try {
      console.log("userGet token", req.token);
      const decoded = tokenVerify(req.token);
      console.log("userGet decoded", decoded);

      const user = await User.findById(decoded.body._id);
      const { _id, username, name, email, isAdmin, avatar, bookmark, date } = user;
      const userSend = { _id, username, name, email, isAdmin, avatar, bookmark, date };
      console.log(userSend);
      res.json(userSend);
    } catch (error) {
      console.log(error);
    }
  }

  async lastSeen(req, res) {
    try {
      const decoded = tokenVerify(req.token);
      const user = await User.findById(decoded.body._id);

      await User.findByIdAndUpdate(user._id, { lastSeen: new Date() });
      res.send("Last seen updated");
    } catch (error) {
      console.log(error);
    }
  }

  // async userGet(req, res) {
  //   try {
  //     const user = await User.findById(req.cookies?.userSession?._id);
  //     res.json(user);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }
}

module.exports = new UserController();
