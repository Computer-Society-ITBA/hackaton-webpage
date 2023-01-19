const express = require('express')
const router = express.Router()
const {roleMiddleware, ROLE_ADMIN, ROLE_MENTOR, ROLE_JURY} = require('../middleware/roleMiddleware')
const {getUser, changePassword} = require('./auth_util')
const authMiddleware = require('../middleware/authMiddleware')
const selfMiddleware = require('../middleware/selfMiddleware')
const {error} = require('../util')
// Todos los endpoints necesitan autenticacion (se require en el nivel de api.js)
// /user endpoints
router.get('/hello',(req,res)=>{
    res.status(200).send({message:'Hello User!'})
})
router.get('/:userId',authMiddleware,async (req, res)=>{
    const uid = req.params.userId
    if(uid===res.locals.userInfo.uid){
        //busca la informacion de su usuario
        const ans = (await getUser(uid))
        if(ans.error){
            return res.status(404).send(ans)
        }
        return res.status(200).send(ans)
    }
    //procesar request
    roleMiddleware([ROLE_ADMIN,ROLE_JURY,ROLE_MENTOR])(req,res,async ()=>{
        const ans = (await getUser(uid))
        if(ans.error){
            return res.status(404).send(ans)
        }
        res.status(200).send(ans)
    })
})
//No se si es necesario agregar el middleware de rol o directamente lo dejamos para todos
router.put('/:userId/password',authMiddleware,selfMiddleware,async(req,res)=>{
    const uid = req.params.userId
    const password = req.body.password
    if(!password){
        return res.status(400).send(error(1,"Missing password"))
    }
    if(uid!==res.locals.userInfo.uid){
        return res.status(403).send(error(2,"Password can be changed only by the account owner"))
    }
    const ans = await changePassword(uid,password)
    if(ans.error){
        return res.status(400).send(ans)
    }
    res.status(200).send(ans)
})

module.exports = router