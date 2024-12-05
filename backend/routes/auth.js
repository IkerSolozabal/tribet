const express = require('express')
const router = express.Router();
const { validatorRegister, validatorLogin } = require('../validators/auth')
const { register, login } = require("../controllers/auth");

router.post("/login", validatorLogin, login)
router.post("/register", validatorRegister, register);

module.exports = router;