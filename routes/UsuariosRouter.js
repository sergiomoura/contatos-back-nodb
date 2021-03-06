const express = require('express');
const router = express.Router();
const UsuariosController = require("../controllers/UsuariosController");

router.post('/registrar', UsuariosController.registrar)
router.post('/login', UsuariosController.login)

module.exports = router;