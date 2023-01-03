const express = require('express')
const router = express.Router()
const {roleMiddleware, ROLE_ADMIN, ROLE_MENTOR, ROLE_JURY} = require('../middleware/roleMiddleware')
const {getUser, changePassword} = require('./auth_util')
const authMiddleware = require('../middleware/authMiddleware')
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
})
//No se si es necesario agregar el middleware de rol o directamente lo dejamos para todos
router.put('/:userId/password',authMiddleware,async(req,res)=>{
    const uid = req.params.userId
    const password = req.body.password
    if(!uid || !password){
        res.status(202).send(error(1,"Missing password or userId"))
        return
    }
    if(uid!==res.locals.userInfo.uid){
        res.status(401).send(error(2,"Password can be change only by the account owner"))
        return
    }
    const ans = await changePassword(uid,password)
    if(ans.error){
        res.status(404).send(ans)
        return
    }
    res.status(200).send(ans)
})

module.exports = router