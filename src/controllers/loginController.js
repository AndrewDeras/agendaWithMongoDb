const Login = require("../models/LoginModel");

exports.loginIndex = (req, res) => {
  res.render("login");
};

exports.register = async (req, res) => {
  try {
    const login = new Login(req.body);
    await login.register();

    if (login.errors.length > 0) {
      req.flash("errors", login.errors);
      req.session.save(() => {
        return res.redirect("/login/index");
      });
      return;
    };

    req.flash("success", "Sua conta foi criada com sucesso.");
    req.session.save(() => {
      return res.redirect("/login/index");
    });

  } catch (error) {
    console.log(error);
    res.render("404");
  }
};