const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const session = require("express-session");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const cookiesMiddleware = require("universal-cookie-express");

const app = express();
const connect = require("./db/db");
const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
};

// Routes import
const userRouter = require("./routes/user");
const productsRouter = require("./routes/products");
const cartRouter = require("./routes/cart");
const categRouter = require("./routes/categories");
const subCategRouter = require("./routes/subCategories");

// allow body parsing to avoid 'undefined'
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// app.use(bodyParser.text());
app.use(cookieParser());
app.use(
  session({
    secret: process.env.SECRET_SESSION,
    resave: true,
    saveUninitialized: true,
  })
);
app.use(cookiesMiddleware());

// route for static images
app.use("/public", express.static(`${__dirname}/storage/img`));

// Routes
app.use("/api/account", cors(corsOptions), userRouter);
app.use("/api/products", cors(corsOptions), productsRouter);
app.use("/api/cart", cors(corsOptions), cartRouter);
app.use("/api/categories", cors(corsOptions), categRouter);
app.use("/api/subCategories", cors(corsOptions), subCategRouter);

connect();

module.exports = app;
