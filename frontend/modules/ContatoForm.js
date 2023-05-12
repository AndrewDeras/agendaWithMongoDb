const validator = require("validator");

export default class ContatoForm {
  constructor(formClass) {
    this.form = document.querySelector(formClass);
  };

  init() {
    this.events();
  };

  events() {
    if (!this.form) return;

    this.form.addEventListener("submit", (e) => {
      e.preventDefault();
      this.validate(e);
    });
  };

  validate(e) {
    const el = e.target;

    const nameValue = el.querySelector("input[name='name']").value;
    const emailValue = el.querySelector("input[name='email']").value;
    const telephoneValue = el.querySelector("input[name='telephone']").value;

    if (!nameValue) {
      document.querySelector(".front-validate2")
        .innerHTML =
        `<div class="alert alert-danger text-center" role="alert">
           O nome é obrigatório.
         </div>`
      return;
    };

    if (!validator.isEmail(emailValue) && !telephoneValue) {
      document.querySelector(".front-validate2")
        .innerHTML =
        `<div class="alert alert-danger text-center" role="alert">
          Pelo menos um campo de contato precisa ser enviado, Email ou Telefone.
         </div>`
      return;
    };

    el.submit();

  };
};