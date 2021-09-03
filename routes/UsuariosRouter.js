const express = require('express');
const router = express.Router();
const UsuariosController = require("../controllers/UsuariosController");

router.post('/registrar', UsuariosController.registrar)

module.exports = router;