const express = require("express");
const router = express.Router();
const {getBetsProprosals, getBetsProprosalsForEventId} = require("../controllers/betsProposals")
const {validatorCreateItem, validatorGetItem} = require("../validators/betsProposals")

router.get("/", getBetsProprosals)
router.get("/:eventId", validatorGetItem, getBetsProprosalsForEventId)

module.exports = router;