const express = require("express");
const router = express.Router();
const { getItems, getItem, createItem, updateItem, deleteItem } = require("../controllers/bets")
const { validatorCreateItem, validatorGetItem } = require("../validators/bets")
const { checkRole } = require("../middlewares/role");
const { authMiddleware } = require("../middlewares/session")

router.get("/", authMiddleware, getItems)
router.get("/:id", validatorGetItem, getItem)
router.post("/", validatorCreateItem, authMiddleware, createItem)
router.put("/:id", validatorCreateItem, validatorGetItem, updateItem)
router.delete("/:id", validatorGetItem, deleteItem)

module.exports = router;