const mongoose = require("mongoose");
const { async } = require("regenerator-runtime");
const validator = require("validator");

const ContatoSchema = new mongoose.Schema({
  name: { type: String, required: true },
  lastName: { type: String, required: false, default: "" },
  email: { type: String, required: false, default: "" },
  telephone: { type: String, required: false, default: "" },
  createdAt: { type: Date, default: Date.now() },
});

const ContatoModel = mongoose.model("Contato", ContatoSchema);

class Contato {
  constructor(body) {
    this.body = body;
    this.errors = [];
    this.contato = null;
  };

   async update(id) {
    if (typeof id !== "string") return;
    this.validate();
    if (this.errors.length > 0) return;

    this.contato = await ContatoModel.findByIdAndUpdate(id, this.body, { new: true });
    return;
  };

  async register() {
    this.validate();
    if (this.errors.length > 0) return;

    this.contato = await ContatoModel.create(this.body);

  };

  static async searchById(id) {
    if (typeof id !== "string") return;
    const contato = await ContatoModel.findById(id);
    return contato;
  };

  validate() {
    this.cleanUp();

    // o e-mail precisa ser válido
    if (this.body.email && !validator.isEmail(this.body.email)) this.errors.push("E-mail inválido.");
    if (!this.body.name) this.errors.push("O nome é um campo obrigatório");

    if (!this.body.email && !this.body.telephone) {
      this.errors.push("Pelo menos um campo de contato precisa ser enviado, Email ou Telefone.");
    }

  };

  cleanUp() {
    for (const key in this.body) {
      if (typeof this.body[key] !== "string") {
        this.body[key] = "";
      };
    };

    this.body = {
      name: this.body.name,
      lastName: this.body.lastName,
      email: this.body.email,
      telephone: this.body.telephone,
    };

  };
};

module.exports = Contato;