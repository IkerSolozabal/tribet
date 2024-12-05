const express = require("express");
const router = express.Router();
const { getItems, getItem, createItem, updateItem, deleteItem } = require("../controllers/events")
const { validatorCreateItem, validatorGetItem } = require("../validators/events")
const { authMiddleware } = require("../middlewares/session")
const { checkRole } = require("../middlewares/role");
const { UserRolesEnum } = require("../models/enums");

router.get("/", authMiddleware, checkRole([UserRolesEnum.USER, UserRolesEnum.ADMIN]), getItems)
router.get("/:id", validatorGetItem, authMiddleware, checkRole([UserRolesEnum.USER, UserRolesEnum.ADMIN]), getItem)
router.post("/", validatorCreateItem, createItem)
router.put("/:id", validatorCreateItem, validatorGetItem, authMiddleware, checkRole([UserRolesEnum.ADMIN]), updateItem)
router.delete("/:id", validatorGetItem, authMiddleware, checkRole([UserRolesEnum.USER]), deleteItem)

module.exports = router;