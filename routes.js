const express = require("express");
const route = express.Router();

// controllers
const { index } = require("./src/controllers/homeController");
const { loginIndex, register } = require("./src/controllers/loginController");

//middleware

//home
route.get("/", index);

//login
route.get("/login/index", loginIndex);
route.post("/login/register", register);



module.exports = route;