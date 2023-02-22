const {error} = require('../util')
//Se debe usar despues de authMiddleware
function selfMiddleware(req, res, next){
    const paramsUid = req.params.userId
    const requestUid = res.locals.userInfo.uid
    if(paramsUid !== requestUid){
        return res.status(403).send(error(2,"Operation can be done only by the account owner"))
    }
    next()
}
module.exports = selfMiddleware

