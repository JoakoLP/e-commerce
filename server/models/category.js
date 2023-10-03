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
  subCategories: {
    //almacenará los IDs de las subcategorías
    type: Array,
  },
});

const Category = mongoose.model("Category", schema);

module.exports = { Category };
