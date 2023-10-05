const mongoose = require("mongoose");
const { appConfig } = require("../config");

const Schema = mongoose.Schema;
const schema = new Schema({
  username: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  status: {
    type: Boolean,
    default: false,
  },
  date: {
    type: Date,
    default: Date.now,
    min: "2023-07-06",
    max: "2030-12-31",
  },
  avatar: {
    //account image
    // data: Buffer,
    // contentType: String,
    type: String,
  },
  // cart = [products:[quantity:Number], total: Number, count: Number]
  cart: { products: Array, total: Number, count: Number },
  remember: Boolean,
  bookmark: {
    type: Array,
  },
});

schema.methods.setImgUrl = function setImgUrl(filename) {
  const { host, port } = appConfig;
  // const SERVER_URL = "https://e-commerce-api.joaquintakara.com";
  const SERVER_URL = "http://localhost:8080";

  this.avatar = `${SERVER_URL}/public/users/${filename}`;
  // this.avatar = `${host}:${port}/public/users/${filename}`;
};

const User = mongoose.model("User", schema);

module.exports = { User };
