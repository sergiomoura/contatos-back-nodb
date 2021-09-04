module.exports = (req,res,next) => {
    if(req.params.id == undefined){
        return res.status(400).json({err:"Requisição exige id do contato"})
    }
    next();
}