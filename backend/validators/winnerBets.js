const {check} = require("express-validator");
const validateResults = require("../utils/handlerValidator.js")
const {BetProposalStatusEnum} = require("../models/enums");

const validatorCreateWinnerbet = [
    check("event").exists().notEmpty().isMongoId().withMessage("Event ID is required"),
    check("participant").exists().notEmpty().isMongoId().withMessage("Participant ID is required"),
    check("odds").optional().isNumeric().withMessage("Odds is required"),
    (req, res, next) => validateResults(req, res, next)
];

const validatorGetWinnerBet = [
    check("winnerBetId").exists().notEmpty().isMongoId(),
    (req, res, next) => validateResults(req, res, next)
];

const validatorGetWinnerBetsForEvent = [
    check("eventId").exists().notEmpty().isMongoId(),
    (req, res, next) => validateResults(req, res, next)
];

module.exports = {validatorCreateWinnerbet, validatorGetWinnerBet, validatorGetWinnerBetsForEvent}

