const express = require('express')
const router = express.Router()
const {roleMiddleware, ROLE_ADMIN, ROLE_MENTOR, ROLE_JURY} = require('../middleware/roleMiddleware')
const {getUser, changePassword} = require('./auth_util')
const {error} = require('../util')
// Todos los endpoints necesitan autenticacion (se require en el nivel de api.js)
// /user endpoints
router.get('/hello',(req,res)=>{
    res.status(200).send({message:'Hello User!'})
})
router.get('/:userId',async (req, res)=>{
    const uid = req.params.userId
    if(uid===res.locals.userInfo.uid){
        //busca la informacion de su usuario
        const ans = (await getUser(uid))
        if(ans.error){
            res.status(404).send(ans)
            return
        }
        res.status(200).send(ans)
        return //hacer send no hace que se deje de ejecutar 
    }
    //procesar request
    roleMiddleware([ROLE_ADMIN,ROLE_JURY,ROLE_MENTOR])(req,res,async ()=>{
        const ans = (await getUser(uid))
        if(ans.error){
            res.status(404).send(ans)
            return
        }
        res.status(200).send(ans)
    })
    return 
})
router.put('/:userId/password',async(req,res)=>{

})

module.exports = router