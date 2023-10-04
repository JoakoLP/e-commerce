const bcrypt = require("bcryptjs");
const { User } = require("../models/user");
const { token60, tokenRemember, tokenVerify } = require("../utils/jwt");
const fs = require("fs");
const path = require("path");

const SERVER_URL = "https://e-commerce-api.joaquintakara.com";
const DOMAIN_URL = ".joaquintakara.com";

class UserController {
  index(req, res) {
    console.log("Información recibida:");
    console.log(req.body);
    // console.log(req.cookies);
    res.status(200).json({
      msg: "a",
    });
  }

  async login(req, res) {
    try {
      const user = await User.findOne({ email: req.body.email });
      console.log(req.body);
      if (!bcrypt.compareSync(req.body.password, user.password)) {
        res.status(500).json({ msg: "Wrong password." });
      } else {
        // console.log(user);

        // req.session.user = { ...user._doc };
        let { _id, username, name, email, isAdmin, avatar, date } = user._doc;
        req.session.user = { _id, username, name, email, isAdmin, avatar, date };
        // console.log(req.user);
        // console.log(req.session.user);
        const token = `Bearer ${req.body.remember ? tokenRemember({ ...req.session.user }) : token60({ ...req.session.user })}`;
        // console.log(token);
        res.cookie(
          "authorization",
          token,
          // `Bearer ${token}`,
          // req.body.remember ? {} : { maxAge: 60000 }
          req.body.remember ? { sameSite: "none", secure: true, domain: DOMAIN_URL } : { maxAge: 60000, sameSite: "none", secure: true, httpOnly: true, domain: DOMAIN_URL }
          // req.body.remember ? { domain: "https://e-commerce-server-psi.vercel.app/" } : { maxAge: 60000, domain: "https://e-commerce-server-psi.vercel.app/" }
        );
        res.cookie(
          "userSession",
          { ...req.session.user },
          req.body.remember ? { sameSite: "none", secure: true, domain: DOMAIN_URL } : { maxAge: 60000, sameSite: "none", secure: true, domain: DOMAIN_URL }
          // req.body.remember ? { domain: "https://e-commerce-five-rose.vercel.app/" } : { maxAge: 60000, domain: "https://e-commerce-five-rose.vercel.app/" }
          // req.body.remember ? { domain: "https://e-commerce-server-psi.vercel.app/" } : { maxAge: 60000, domain: "https://e-commerce-server-psi.vercel.app/" }
        );
        // console.log(req.cookies);
        await User.findByIdAndUpdate(user._id, { status: true });
        if (!req.body.remember) {
          setTimeout(async () => {
            // switch status if 'interval'
            console.log("logout time");
            await User.findByIdAndUpdate(user?._id, { status: false });
          }, 60000);
        }
        console.log(`${user.name} login`);
        res.status(201).json({
          user: { ...req.session.user },
          msg: "Logged in!",
          // token,
        });
      }
    } catch (error) {
      // console.log(error.response.data);
      res.json(error);
    }
  }

  async logout(req, res) {
    try {
      const user = await User.findById(req.cookies.userSession._id);
      console.log(`${user?.name} logout`);
      res.clearCookie("userSession");
      res.clearCookie("authorization");
      await User.findByIdAndUpdate(user?._id, { status: false });
      req.session.destroy();
      res.status(201).json({
        msg: "Session closed.",
      });
    } catch (error) {
      res.json(error);
    }
  }

  async register(req, res) {
    try {
      console.log(req.files[0]);
      const salt = bcrypt.genSaltSync(8);
      const passwordHash = bcrypt.hashSync(req.body.password, salt);
      const user = new User({
        username: req.body.username,
        name: req.body.name,
        email: req.body.email,
        password: passwordHash,
        isAdmin: false,
        avatar: `${SERVER_URL}/public/default/user-avatar.png`,
        // avatar: "http://localhost:8080/public/default/user-avatar.png",
        cart: { products: [], total: 0, count: 0 },
      });
      if (req.files[0]) {
        console.log("Hay avatar!");
        const { filename } = req.files[0];
        user.setImgUrl(filename);
        // console.log(user.avatar);
      } else {
        console.log("No hay avatar!");
      }
      await user.save();

      let { _id, username, name, email, isAdmin, avatar, date } = user._doc;
      req.session.user = { _id, username, name, email, isAdmin, avatar, date };

      const token = token60({ ...req.session.user });
      // console.log(token);
      res.cookie("authorization", `Bearer ${token}`, { maxAge: 60000, sameSite: "none", secure: true, httpOnly: true });
      // res.cookie("userSession", { ...req.session.user }, { maxAge: 60000, sameSite: "none", secure: true });

      res.cookie("userSession", { ...req.session.user, remember: false }, { maxAge: 60000, sameSite: "none", secure: true });
      await User.findByIdAndUpdate(user._id, { status: true });
      setTimeout(async () => {
        // switch status if 'interval'
        await User.findByIdAndUpdate(user?._id, { status: false });
      }, 60000);
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
          console.log(user.avatar);
          const filename = path.basename(user.avatar);
          console.log(filename);
          fs.unlinkSync("storage/img/user/" + filename, filename);
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
      const decoded = tokenVerify(req.token);
      console.log(decoded);

      const user = await User.findById(decoded.body._id);
      const { _id, username, name, email, isAdmin, avatar, bookmark, date } = user;
      const userSend = { _id, username, name, email, isAdmin, avatar, bookmark, date };
      console.log(userSend);
      res.json(userSend);
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
