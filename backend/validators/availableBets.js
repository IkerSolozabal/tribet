const {check} = require("express-validator");
const validateResults = require("../utils/handlerValidator.js")

const validatorGetItem = [
    check("eventId").exists().notEmpty().isMongoId(),
    (req, res, next) => validateResults(req, res, next)
];

module.exports = {validatorGetItem}