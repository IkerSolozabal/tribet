const {check} = require("express-validator");
const validateResults = require("../utils/handlerValidator.js")
const {EventTagsEnum, EventStatusEnum} = require("../models/enums.js");

const isFutureDate = (value) => {
    const startDate = new Date(value);
    if (startDate <= new Date()) {
        throw new Error("Start date must be in the future");
    }
    return true;
};

const validatorCreateEvent = [
    check("name").exists().notEmpty().withMessage("Event name is required"),
    check("startDate").exists().notEmpty().isISO8601().withMessage("Valid start date is required").custom(isFutureDate),
    check("location").optional().isString().withMessage("location is required"),
    check("tags")
        .exists().notEmpty()
        .isIn(Object.values(EventTagsEnum))
        .withMessage(`Tag must be one of the following: ${Object.values(EventTagsEnum)}`),
    check("status")
        .optional()
        .isIn([Object.values(EventStatusEnum)])
        .withMessage(`Status must be one of the following: ${Object.values(EventStatusEnum)}`),
    (req, res, next) => validateResults(req, res, next)
];

const validatorGetEvent = [
    check("eventId").exists().notEmpty().isMongoId(),
    (req, res, next) => validateResults(req, res, next)
];

module.exports = {validatorCreateEvent, validatorGetEvent}