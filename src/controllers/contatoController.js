const Contato = require("../models/ContatoModel");

exports.contatoIndex = (req, res) => {
  res.render("contato");
};

exports.contatoRegister = async (req, res) => {
  try {
    const contato = new Contato(req.body);
    await contato.register();

    if (contato.errors.length > 0) {
      req.flash("errors", contato.errors);
      req.session.save(() => res.redirect("/contato/index"));
      return;
    };

    req.flash("success", "Contato cadastrado com sucesso.");
    req.session.save(() => res.redirect(`/contato/index/${contato.contato._id}`));

  } catch (error) {
    console.log(error);
    return res.render("404");
  }
};

exports.contatoEdit = async (req, res) => {

  if (!req.params.id) return res.render("404");

  const contato = await Contato.searchById(req.params.id);

  if (!contato) return res.render("404");

  res.render("contato", { contato: contato });

};