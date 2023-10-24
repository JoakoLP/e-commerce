const mongoose = require("mongoose");
const { appConfig } = require("../config");

const Schema = mongoose.Schema;
const schema = new Schema({
  prod_id: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  tags: {
    type: Array,
  },
  category: {
    type: Array,
    required: true,
  },
  categoryTemp: {
    type: String,
  },
  subCategory: {
    type: Array,
  },
  subCategoryTemp: {
    type: String,
  },
  desc: {
    type: String,
  },
  img: {
    type: {
      type: String,
    },
    data: {
      type: String,
    },
  },
  reputation: {
    type: Number,
  },
  brand: {
    type: String,
    required: true,
  },
  color: {
    type: String,
  },
});

schema.methods.setImgUrl = function setImgUrl(filename) {
  this.img.data = filename;
};

const Product = mongoose.model("Product", schema);

module.exports = { Product };
