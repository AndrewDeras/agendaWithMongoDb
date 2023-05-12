import "core-js/stable";
import "regenerator-runtime/runtime";

import 'bootstrap/dist/js/bootstrap.bundle.js';

import LoginAndSignin from "./modules/LoginAndSignin";
import ContatoForm from "./modules/ContatoForm";

const login = new LoginAndSignin(".form-login");
const signin = new LoginAndSignin(".form-signin");

const contatoEdit = new ContatoForm(".form-edit");
const contatoCreate = new ContatoForm(".form-create");

login.init();
signin.init();

contatoEdit.init();
contatoCreate.init();
