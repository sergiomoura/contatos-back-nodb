module.exports = (req, res, next) => {

    let {nome, email, telefones} = req.body;
    
    console.log(nome, email, telefones);
    
    if((typeof nome) != 'string'){
        return res.status(400).json({err:"Contato mal formado 1"});
    }
    if((typeof email) != 'string'){
        return res.status(400).json({err:"Contato mal formado 2"});
    }
    
    if(Array.isArray(telefones)){
        telefones.forEach(
            tel => {if((typeof tel) != 'string'){return res.status(400).json({err:"Contato mal formado"})}}
        )
    } else {
        res.status(400).json({err:"Contato mal formado 3"});       
    }
    req.contato = req.body;
    next();
}