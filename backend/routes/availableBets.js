const express = require("express");
const router = express.Router();
const {getAvailableBets, getAvailableBetsForEventId} = require("../controllers/availableBets")
const {validatorCreateItem, validatorGetItem} = require("../validators/betsProposals")

router.get("/", getAvailableBets)
router.get("/:eventId", validatorGetItem, getAvailableBetsForEventId)

module.exports = router;