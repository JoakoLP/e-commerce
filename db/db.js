const mongoose = require("mongoose");
mongoose.set("strictQuery", true);
require("dotenv").config();

module.exports = connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_CNN);
    console.log("Connected to MongoBD");
  } catch (error) {
    console.log("Couldn't connect to MongoDB");
    console.error(error);
  }
};
