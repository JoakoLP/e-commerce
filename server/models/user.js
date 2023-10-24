const mongoose = require("mongoose");
const { appConfig } = require("../config");

const Schema = mongoose.Schema;
const schema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
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
  lastSeen: {
    type: Date,
    min: "2023-07-06",
    max: "2030-12-31",
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
  this.avatar = filename;
};

const User = mongoose.model("User", schema);

module.exports = { User };
