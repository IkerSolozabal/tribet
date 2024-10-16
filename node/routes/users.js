const express = require("express");
const router = express.Router();
const {getItems} = require("../controllers/users")

router.get("/listar_usuarios", getItems)

module.exports = router;