const { check } = require("express-validator");
const validateResults = require("../utils/handlerValidator.js")

const validatorCreateItem = [
    check("email").exists().notEmpty().isEmail(),
    check("password").exists().notEmpty(),
    check("role").exists().notEmpty(),
    (req, res, next) => validateResults(req, res, next)
];

const validatorGetItem = [
    check("id").exists().notEmpty().isMongoId(),
    (req, res, next) => validateResults(req, res, next)
];

module.exports = {validatorCreateItem, validatorGetItem}