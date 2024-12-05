const { check } = require("express-validator");
const validateResults = require("../utils/handlerValidator.js")

const validatorCreateItem = [
    check("betProposal").exists().isMongoId().withMessage("A valid bet option ID is required"),
    check("betType").exists(),
    check("amount").exists().isFloat({ min: 1 }).withMessage("A valid amount is required"),
    check("status").optional().isIn(["open", "won", "lost", "cancelled"]).withMessage("Invalid status"),
    (req, res, next) => validateResults(req, res, next),
];

const validatorGetItem = [
    check("id").exists().notEmpty().isMongoId(),
    (req, res, next) => validateResults(req, res, next)
];

module.exports = { validatorCreateItem, validatorGetItem }