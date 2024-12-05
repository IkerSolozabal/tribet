const { check } = require("express-validator");
const validateResults = require("../utils/handlerValidator.js")

const isTeam = (value, { req }) => {
    return !req.body.isTeam
};

const validatorCreateItem = [
    check("name")
        .exists().withMessage("Name is required")
        .notEmpty().withMessage("Name cannot be empty"),
    check("isTeam")
        .exists().withMessage("isTeam field is required")
        .isBoolean().withMessage("isTeam must be a boolean value"),
    check("team")
        .optional()
        .isMongoId().withMessage("Invalid team ID format")
        .custom(isTeam).withMessage('Is a team'), // Este campo es opcional, solo se requiere si isTeam es true
    (req, res, next) => validateResults(req, res, next)
];

const validatorGetItem = [
    check("id").exists().notEmpty().isMongoId(),
    (req, res, next) => validateResults(req, res, next)
];

module.exports = { validatorCreateItem, validatorGetItem }