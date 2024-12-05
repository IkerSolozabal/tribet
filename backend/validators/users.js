const { check } = require("express-validator");
const validateResults = require("../utils/handlerValidator.js")
const { UserRolesEnum } = require("../models/enums.js");

const validatorCreateUser = [
    check("email")
        .exists().withMessage("The email field is required.")
        .notEmpty().withMessage("Email cannot be empty.")
        .isEmail().withMessage("Please provide a valid email address."),
    check("password")
        .exists().withMessage("The password field is required.")
        .notEmpty().withMessage("Password cannot be empty."),
    check("name")
        .exists().withMessage("The name field is required.")
        .notEmpty().withMessage("Name cannot be empty."),
    check("role")
        .exists().withMessage("The role field is required.")
        .notEmpty().withMessage("Role cannot be empty.")
        .isIn(Object.values(UserRolesEnum)),
    (req, res, next) => validateResults(req, res, next)
];

const validatorGetUser = [
    check("userId")
        .exists().withMessage("The ID field is required.")
        .notEmpty().withMessage("ID cannot be empty.")
        .isMongoId().withMessage("The ID must be a valid MongoDB ObjectId."),
    (req, res, next) => validateResults(req, res, next)
];

module.exports = { validatorCreateUser, validatorGetUser }