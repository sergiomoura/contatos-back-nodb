require('dotenv').config();
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) =>{
    try {
        let usuario = jwt.verify(req.token, process.env.JWT_SECRET);
        req.usuario = usuario;
        next();
    } catch (error) {
        res.status(403).json({err:"Token inválido"});
    }
}