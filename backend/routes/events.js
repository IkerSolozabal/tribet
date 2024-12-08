const express = require("express");
const router = express.Router();
const {getEvents, getEventById, createEvent, updateEventById, deleteEventById} = require("../controllers/events")
const {validatorCreateEvent, validatorGetEvent} = require("../validators/events")
const {authMiddleware} = require("../middlewares/session")
const {checkRole} = require("../middlewares/role");
const {UserRolesEnum} = require("../models/enums");

router.get("/", authMiddleware, checkRole([UserRolesEnum.USER, UserRolesEnum.ADMIN]), getEvents)
router.get("/:eventId", validatorGetEvent, authMiddleware, checkRole([UserRolesEnum.USER, UserRolesEnum.ADMIN]), getEventById)
router.post("/", validatorCreateEvent, createEvent)
router.put("/:eventId", validatorCreateEvent, validatorGetEvent, authMiddleware, checkRole([UserRolesEnum.ADMIN]), updateEventById)
router.delete("/:eventId", validatorGetEvent, authMiddleware, checkRole([UserRolesEnum.USER]), deleteEventById)

module.exports = router;