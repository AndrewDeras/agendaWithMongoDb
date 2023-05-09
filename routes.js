const express = require("express");
const route = express.Router();

// controllers
const { index } = require("./src/controllers/homeController");
const { loginIndex } = require("./src/controllers/loginController");

//middleware

//home
route.get("/", index);

//login

route.get("/login/index", loginIndex);


module.exports = route;