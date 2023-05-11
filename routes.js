const express = require("express");
const route = express.Router();

// controllers
const { index } = require("./src/controllers/homeController");
const { loginIndex, register, login, logout } = require("./src/controllers/loginController");
const { contatoIndex, contatoRegister, contatoEdit, contatoUpdate } = require("./src/controllers/contatoController");

//middleware

const { loginRequired } = require("./src/middlewares/middleware");

//home
route.get("/", index);

//login
route.get("/login/index", loginIndex);
route.post("/login/register", register);
route.post("/login/login", login);
route.get("/login/logout", logout);

//contato 
route.get("/contato/index", loginRequired, contatoIndex);
route.post("/contato/register", loginRequired, contatoRegister);
route.get("/contato/index/:id", loginRequired, contatoEdit);
route.post("/contato/edit/:id", loginRequired, contatoUpdate);



module.exports = route;