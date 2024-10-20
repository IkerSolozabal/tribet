const {check, body} = require("express-validator");
const validateResults = require("../utils/handlerValidator")

const validatorRegister = [
    check("name").exists().notEmpty().isString(),
    check("email").exists().notEmpty().isEmail(),
    check("password").exists().notEmpty().isString(),
    (req, res, next) => validateResults(req, res, next)
];

const validatorLogin = [
    check("email").exists().notEmpty().isEmail(),
    check("password").exists().notEmpty().isString(),
    (req, res, next) => validateResults(req, res, next)
];

module.exports = {validatorRegister, validatorLogin}