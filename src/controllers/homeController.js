const Contato = require("../models/ContatoModel");

exports.index = async (req, res) => {

  try {
    const contatos = await Contato.searchAll();
    res.render("index", { contatos });

  } catch (error) {
    console.log(error);
    res.render("404");
  }

};
