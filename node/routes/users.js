const express = require("express");
const router = express.Router();
const {getItems, getItem, createItem, updateItem, deleteItem} = require("../controllers/users")
const {validatorCreateItem, validatorGetItem} = require("../validators/users")

router.get("/", getItems)
router.get("/:id", validatorGetItem, getItem)
router.put("/:id", validatorCreateItem, validatorGetItem, updateItem)
router.delete("/:id", validatorGetItem, deleteItem)

module.exports = router;