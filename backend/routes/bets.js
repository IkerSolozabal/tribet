const express = require("express");
const router = express.Router();
const {getItems, getItem, createItem, updateItem, deleteItem} = require("../controllers/bets")
const {createWinnerBet, getWinnerBets, getWinnerBetsForEvent} = require("../controllers/winnerBets")
const {validatorCreateItem, validatorGetItem} = require("../validators/bets")
const {checkRole} = require("../middlewares/role");
const {authMiddleware} = require("../middlewares/session")
const {validatorCreateWinnerbet, validatorGetWinnerBetsForEvent, validatorGetWinnerBet} = require("../validators/winnerBets");

router.get("/", authMiddleware, getItems)
router.get("/:id", validatorGetItem, getItem)
router.post("/", validatorCreateItem, authMiddleware, createItem)
router.put("/:id", validatorCreateItem, validatorGetItem, updateItem)
router.delete("/:id", validatorGetItem, deleteItem)

// Winner Bets
router.get("/winner/:eventId", validatorGetWinnerBetsForEvent, authMiddleware, getWinnerBetsForEvent)
router.post("/winner", validatorCreateWinnerbet ,authMiddleware, createWinnerBet)

module.exports = router;