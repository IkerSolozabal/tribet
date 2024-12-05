const { check } = require("express-validator");
const validateResults = require("../utils/handlerValidator")

const validatorRegister = [
    check("name")
        .exists().withMessage("Name is required")
        .notEmpty().withMessage("Name cannot be empty")
        .isString().withMessage("Name must be a string"),
    check("email")
        .exists().withMessage("Email is required")
        .notEmpty().withMessage("Email cannot be empty")
        .isEmail().withMessage("Email must be a valid email address"),
    check("password")
        .exists().withMessage("Password is required")
        .notEmpty().withMessage("Password cannot be empty")
        .isString().withMessage("Password must be a string"),
    (req, res, next) => validateResults(req, res, next)
];

const validatorLogin = [
    check("email")
        .exists().withMessage("Email is required")
        .notEmpty().withMessage("Email cannot be empty")
        .isEmail().withMessage("Email must be a valid email address"),
    check("password")
        .exists().withMessage("Password is required")
        .notEmpty().withMessage("Password cannot be empty")
        .isString().withMessage("Password must be a string"),
    (req, res, next) => validateResults(req, res, next)
];

module.exports = { validatorRegister, validatorLogin }