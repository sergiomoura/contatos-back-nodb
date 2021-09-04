module.exports = (req, res, next) => {
    
    if(!req.headers.authorization){
        return res.status(403).json({err:"Request sem token de autorização"})
    }
    
    let token = req.headers.authorization.replace('Bearer ','');
    req.token = token;  
    
    next();
}