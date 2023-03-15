const {error} = require('../util')
//Se debe usar despues de authMiddleware
function bodySelfMiddleware(req, res, next){
    const bodyUid = req.body.userId
    const requestUid = res.locals.userInfo.uid
    if(bodyUid !== requestUid){
        return res.status(403).send(error(2,"Operation can be done only by the account owner"))
    }
    next()
}
module.exports = bodySelfMiddleware
