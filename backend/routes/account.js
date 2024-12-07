const express = require("express");
const router = express.Router();
const {getAccountInfo} = require("../controllers/users")
const {getAccountBets} = require("../controllers/bets")

const {authMiddleware} = require("../middlewares/session")
const {checkRole} = require("../middlewares/role");
const {UserRolesEnum} = require("../models/enums");


router.get("/", authMiddleware, checkRole([UserRolesEnum.USER]), getAccountInfo)
router.get("/bets", authMiddleware, checkRole([UserRolesEnum.USER]), getAccountBets)

module.exports = router;