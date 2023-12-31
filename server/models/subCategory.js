const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const schema = new Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  category: {
    type: Object,
  },
});

const SubCategory = mongoose.model("subCategory", schema);

module.exports = { SubCategory };
