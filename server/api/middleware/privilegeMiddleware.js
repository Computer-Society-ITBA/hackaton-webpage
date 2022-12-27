const auth = require('../config')
const {error} = require('../util')
//se debe ubicar DESPUES del middleware de auth
//ya que este pasa el uid (asi no tenemos que verificar el token otra vez)
function privilegeMiddleware(allowed){
    return (req, res, next)=>{
        const decodedToken = req.decodedToken
        if(decodedToken && allowed.includes(decodedToken.privilegeLevel)){
            next()
        }else{
            res.status(403).send(error(4,"Missing or insufficient permission"))
            return 
        }
    }
}