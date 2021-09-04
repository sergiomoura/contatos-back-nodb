require('dotenv').config();
const fs = require('fs');
const path = require('path')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const arquivo = '../database/usuarios.json';

module.exports = {
    registrar: (req, res) => {
        let usuarios = [];
        if(fs.existsSync(path.resolve(__dirname,arquivo))){
            usuarios = require(arquivo);
        }
        
        let {nome, email, senha} = req.body;
        let id = 1;
        if(usuarios.length > 0){
            id = usuarios[usuarios.length - 1] + 1;
        }

        usuarios.push(
            {id,nome,email,senha:bcrypt.hashSync(senha,10)}
        )
        fs.writeFileSync(path.resolve(__dirname,arquivo), JSON.stringify(usuarios,null,1));

        res.status(200).json({msg:"ok"});
    },
    login: (req,res) => {
        
        let {email, senha} = req.body;
        
        let usuarios = [];
        if(fs.existsSync(path.resolve(__dirname,arquivo))){
            usuarios = require(arquivo);
        }

        let usuario = usuarios.find(
            u => {
                console.log(u);
                console.log(senha, u.senha);
                return u.email == email && bcrypt.compareSync(senha, u.senha);                
            }
        );

        if(usuario){
            let u = {...usuario};
            delete u.senha;
            let token = jwt.sign(u,process.env.JWT_SECRET);
            res.status(200).json({token});
        } else {
            res.status(403).json({err:"Forbiden"})
        }
    }
}