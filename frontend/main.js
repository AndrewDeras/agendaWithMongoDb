import "core-js/stable";
import "regenerator-runtime/runtime";

import 'bootstrap/dist/js/bootstrap.bundle.js';

import LoginAndSignin from "./modules/LoginAndSignin";

const login = new LoginAndSignin(".form-login");
const signin = new LoginAndSignin(".form-signin");

login.init();
signin.init();