const express = require("express");
const router = express.Router();
const { getItems, getItem, createItem, updateItem, deleteItem, addParticipants, addParticipantsToResult} = require("../controllers/results")
const { validatorCreateItem, validatorGetItem } = require("../validators/results")
const { authMiddleware } = require("../middlewares/session")
const { checkRole } = require("../middlewares/role");
const { UserRolesEnum } = require("../models/enums");


router.get("/", authMiddleware, checkRole([UserRolesEnum.USER]), getItems)
//router.get("/:id", validatorGetItem, authMiddleware, checkRole([RoleTypeEnum.ADMIN]), getItem)
//router.post("/", validatorCreateItem, authMiddleware, checkRole([RoleTypeEnum.USER]), createItem)
router.put("/:resultId", validatorCreateItem, authMiddleware, checkRole([UserRolesEnum.USER]), addParticipantsToResult)
//router.put("/:resultId/participants", validatorCreateItem, authMiddleware, checkRole([RoleTypeEnum.USER]), createItem)
//router.put("/:id", validatorCreateItem, validatorGetItem, authMiddleware, checkRole([RoleTypeEnum.ADMIN]), updateItem)
//router.delete("/:id", validatorGetItem, authMiddleware, checkRole([RoleTypeEnum.ADMIN]), deleteItem)

module.exports = router;