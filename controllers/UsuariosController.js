const fs = require('fs');
const path = require('path')
const bcrypt = require('bcrypt');

const arquivo = '../database/usuarios.json';
const usuarios = require(arquivo);

module.exports = {
    registrar: (req, res) => {
        let {nome, email, senha} = req.body;
        usuarios.push(
            {nome,email,senha:bcrypt.hashSync(senha,10)}
        )
        fs.writeFileSync(path.resolve(__dirname,arquivo), JSON.stringify(usuarios,null,1));

        res.status(200).json({msg:"ok"});
    }
}