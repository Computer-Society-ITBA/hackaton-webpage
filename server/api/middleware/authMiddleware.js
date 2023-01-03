const {adminAuth}= require('../config')
const {error} = require('../util')

async function authMiddleware (req, res, next) {
    const authHeader = req.headers['authorization'] //no tengo idea por que si los pongo con A mayuscula no lo reconoce
    if(!authHeader){
        res.status(401).send(error(1,"Misising Authorization header"))
        return
    }
    const strings = authHeader.split(' ')
    if(strings.length!==2 || !strings[1] ||  strings[0]!=='Bearer'){
        res.status(401).send(error(2,'Bad access token'))
        return
    }

    //Debe ser un IdToken, no otro
    try{
        const decodedToken = await adminAuth.verifyIdToken(strings[1])
        res.locals.userInfo = decodedToken
        next()
    }catch(err){
        console.log(err)
        res.status(401).send(error(3,"Invalid token"))
    }
}
module.exports = authMiddleware