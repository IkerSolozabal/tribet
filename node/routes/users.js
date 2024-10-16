const express = require("express");
const router = express.Router();

router.get("/listar_usuarios", (req, res) => {
    const data = ["LISTA", "USUARIOS"];
    res.send({data})
})

module.exports = router;