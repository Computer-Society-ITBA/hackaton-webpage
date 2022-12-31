const auth = require('../config')
const {error} = require('../util')
//se debe ubicar DESPUES del middleware de auth
//ya que este pasa el uid (asi no tenemos que verificar el token otra vez)
function roleMiddleware(allowed){
    return (req, res, next)=>{
        const decodedToken = req.decodedToken
        if(decodedToken && allowed.includes(decodedToken.role)){
            next()
        }else{
            res.status(403).send(error(4,"Missing or insufficient permission"))
            return 
        }
    }
}
const ROLE_ADMIN = 'admin'
const ROLE_JURY = 'jury'
const ROLE_MENTOR = 'mentor'
const ROLE_USER = 'user'
module.exports = {roleMiddleware,ROLE_ADMIN, ROLE_JURY,ROLE_MENTOR, ROLE_USER }