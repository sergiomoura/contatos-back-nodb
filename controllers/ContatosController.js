const fs = require('fs');
const path = require('path');

module.exports = {
    index: (req, res) => {
        const filePath = path.resolve(__dirname,`../database/contatos_${req.usuario.id}.json`);
        if(!fs.existsSync(filePath)) {
            fs.writeFileSync(filePath,"[]");
            res.status(200).json([]);
        } else {
            res.status(200).send(fs.readFileSync(filePath));
        }
    },
    create: (req, res) => {
        const filePath = path.resolve(__dirname,`../database/contatos_${req.usuario.id}.json`);
        let contatos = [];
        
        if(fs.existsSync(filePath)) {
            contatos = JSON.parse(fs.readFileSync(filePath));
        }

        if(contatos.length == 0) {
            req.contato.id = 1    
        } else {
            req.contato.id = contatos[contatos.length - 1].id + 1;
        }
        
        contatos.push(req.contato)
        fs.writeFileSync(filePath,JSON.stringify(contatos,null,1));
        res.status(201).json(req.contato);
    },
    update: (req, res) => {
        const filePath = path.resolve(__dirname,`../database/contatos_${req.usuario.id}.json`);
        
        let contatos;
        if(fs.existsSync(filePath)) {
            contatos = JSON.parse(fs.readFileSync(filePath));
        } else {
            return res.status(404).json({err:"Contato inexistente"});
        }

        let pos = contatos.findIndex(c => c.id == req.params.id);
        if(pos == -1){
            return res.status(404).json({err:"Contato inexistente"});
        }
        
        contatos[pos] = req.contato;

        fs.writeFileSync(filePath,JSON.stringify(contatos,null,1));
        res.status(201).json(req.contato)
    },
    destroy: (req,res) => {
        const filePath = path.resolve(__dirname,`../database/contatos_${req.usuario.id}.json`);
        
        let contatos;
        if(fs.existsSync(filePath)) {
            contatos = JSON.parse(fs.readFileSync(filePath));
        } else {
            return res.status(404).json({err:"Contato inexistente"});
        }

        let pos = contatos.findIndex(c => c.id == req.params.id);
        if(pos == -1){
            return res.status(404).json({err:"Contato inexistente"});
        }
        
        contatos.splice(pos,1);

        fs.writeFileSync(filePath,JSON.stringify(contatos,null,1));
        res.status(200).json()
    }
}