const express = require('express');
const router = express.Router();
const ContatosController = require("../controllers/ContatosController");
const ValidateContato = require('../middlewares/ValidateContato');
const VerifyIdParam = require('../middlewares/VerifyIdParam');

router.get('/contatos', ContatosController.index);
router.post('/contatos', ValidateContato, ContatosController.create);
router.put('/contatos/:id', VerifyIdParam, ValidateContato, ContatosController.update);
router.delete('/contatos/:id', VerifyIdParam, ContatosController.destroy);

module.exports = router;