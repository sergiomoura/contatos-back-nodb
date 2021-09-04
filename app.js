var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var UsuariosRouter = require('./routes/UsuariosRouter');
var ContatosRouter = require('./routes/ContatosRouter');
var VerifyToken = require('./middlewares/VerifyToken');
var TokenExists = require('./middlewares/TokenExists');
var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', UsuariosRouter);
app.use('/', TokenExists, VerifyToken, ContatosRouter);

module.exports = app;
