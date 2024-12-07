const express = require("express");
const router = express.Router();
const {getUsers, getUserById, updateUserById, deleteUserById, createUser} = require("../controllers/users")
const {validatorCreateUser, validatorGetUser} = require("../validators/users")
const {authMiddleware} = require("../middlewares/session")
const {checkRole} = require("../middlewares/role");
const {UserRolesEnum} = require("../models/enums");


router.get("/", authMiddleware, checkRole([UserRolesEnum.ADMIN]), getUsers)
router.get("/:userId", validatorGetUser, authMiddleware, checkRole([UserRolesEnum.ADMIN]), getUserById)
router.post("/", validatorCreateUser, authMiddleware, checkRole([UserRolesEnum.ADMIN]), createUser)
router.put("/:userId", validatorCreateUser, validatorGetUser, authMiddleware, checkRole([UserRolesEnum.ADMIN]), updateUserById)
router.delete("/:userId", validatorGetUser, authMiddleware, checkRole([UserRolesEnum.ADMIN]), deleteUserById)

module.exports = router;