const { login } = require('./login');
const { me } = require('./me');
const { register } = require('./register');
const { reverify } = require('./reverify');
const { verify } = require('./verify');
const { forgot } = require('./forgot');
const { reset } = require('./reset');
const { registerPhone } = require('./registerPhone');
const { loginPhone } = require('./loginPhone');
const { profile } = require('./profile');

module.exports.register = register;
module.exports.login = login;
module.exports.verify = verify;
module.exports.reverify = reverify;
module.exports.forgot = forgot;
module.exports.reset = reset;

module.exports.me = me;
module.exports.registerPhone = registerPhone;
module.exports.loginPhone = loginPhone;

module.exports.profile = profile;
