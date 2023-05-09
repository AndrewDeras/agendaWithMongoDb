const mongoose = require("mongoose");
const validator = require('validator');
const bcryptjs = require("bcryptjs");

const LoginSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
});

const LoginModel = mongoose.model("Login", LoginSchema);

class Login {
  constructor(body) {
    this.body = body;
    this.errors = [];
    this.user = null;
  };

  async register() {
    this.validate();
    if (this.errors.length > 0) return;

    await this.userExist();

    if (this.errors.length > 0) return;

    const salt = bcryptjs.genSaltSync();
    this.body.password = bcryptjs.hashSync(this.body.password, salt);

    this.user = await LoginModel.create(this.body)

  };

  async login() {
    this.validate();
    if (this.errors.length > 0) return;
    this.user = await LoginModel.findOne({ email: this.body.email });

    if (!this.user) {
      this.errors.push("E-mail não cadastrado na base de dados.");
      return;
    };

    if (!bcryptjs.compareSync(this.body.password, this.user.password)) {
      this.errors.push("Senha inválida.");
      this.user = null;
      return;
    };

  };

  async userExist() {
    this.user = await LoginModel.findOne({ email: this.body.email });
    if (this.user) this.errors.push("E-mail já cadastrado na nossa base de dados.");
  };

  validate() {
    this.cleanUp();

    // o e-mail precisa ser válido
    if (!validator.isEmail(this.body.email)) this.errors.push("E-mail inválido.");

    // senha com mais de 8 e 25 caracteres
    if (this.body.password.length < 8 || this.body.password.length > 25) {
      this.errors.push("A senha precisa ter entre 8 e 25 caracteres.")
    };
  };

  cleanUp() {
    for (const key in this.body) {
      if (typeof this.body[key] !== "string") {
        this.body[key] = "";
      };
    };

    this.body = {
      email: this.body.email,
      password: this.body.password,
    };

  };
};

module.exports = Login;