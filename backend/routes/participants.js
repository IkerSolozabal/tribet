const express = require("express");
const router = express.Router();
const { getItems, getItem, createItem, updateItem, deleteItem } = require("../controllers/participants")
const { validatorCreateItem, validatorGetItem } = require("../validators//participants")
const { authMiddleware } = require("../middlewares/session")
const { checkRole } = require("../middlewares/role");
const { UserRolesEnum } = require("../models/enums");

router.get("/", authMiddleware, checkRole([UserRolesEnum.ADMIN, UserRolesEnum.USER]), getItems)
router.get("/:id", validatorGetItem, authMiddleware, checkRole([UserRolesEnum.ADMIN, UserRolesEnum.USER]), getItem)
router.post("/", validatorCreateItem, authMiddleware, checkRole([UserRolesEnum.USER]), createItem)
router.put("/:id", validatorCreateItem, validatorGetItem, authMiddleware, checkRole([UserRolesEnum.ADMIN]), updateItem)
router.delete("/:id", validatorGetItem, authMiddleware, checkRole([UserRolesEnum.ADMIN]), deleteItem)

module.exports = router;