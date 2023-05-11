const validator = require("validator");

export default class LoginAndSignin {
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

    const emailValue = el.querySelector("input[name='email']").value;
    const passwordValue = el.querySelector("input[name='password']").value;

    if (!validator.isEmail(emailValue)) {
      document.querySelector(".front-validate")
        .innerHTML =
        `<div class="alert alert-danger text-center" role="alert">
          E-mail inválido.
        </div>`
      return;
    };

    if (passwordValue.length < 8 || passwordValue.length > 25) {
      document.querySelector(".front-validate")
        .innerHTML =
        `<div class="alert alert-danger text-center" role="alert">
            A senha precisa ter entre 8 e 25 caracteres.
          </div>`
      return;
    };

    el.submit();

  };
};