const express = require('express');
const router = express.Router();
const ContatosController = require("../controllers/ContatosController");
const ValidateContato = require('../middlewares/ValidateContato');

router.get('/contatos', ContatosController.index);
router.post('/contatos', ValidateContato, ContatosController.create);

module.exports = router;