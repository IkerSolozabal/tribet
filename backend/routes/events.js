const express = require("express");
const router = express.Router();
const { getItems, getItem, createItem, updateItem, deleteItem } = require("../controllers/events")
const { validatorCreateEvent, validatorGetEvent } = require("../validators/events")
const { authMiddleware } = require("../middlewares/session")
const { checkRole } = require("../middlewares/role");
const { UserRolesEnum } = require("../models/enums");

router.get("/", authMiddleware, checkRole([UserRolesEnum.USER, UserRolesEnum.ADMIN]), getItems)
router.get("/:id", validatorCreateEvent, authMiddleware, checkRole([UserRolesEnum.USER, UserRolesEnum.ADMIN]), getItem)
router.post("/", validatorCreateEvent, createItem)
router.put("/:id", validatorCreateEvent, validatorGetEvent, authMiddleware, checkRole([UserRolesEnum.ADMIN]), updateItem)
router.delete("/:id", validatorGetEvent, authMiddleware, checkRole([UserRolesEnum.USER]), deleteItem)

module.exports = router;