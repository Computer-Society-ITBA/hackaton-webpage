const express = require('express')
const router = express.Router()
const {roleMiddleware, ROLE_ADMIN, ROLE_MENTOR, ROLE_JURY} = require('../middleware/roleMiddleware')
const {getUser} = require('./auth_util')


// /user endpoints
router.get('/hello',(req,res)=>{
    res.status(200).send({message:'Hello User!'})
})
router.get('/:userId',async (req, res)=>{
    const uid = req.params.userId
    if(uid===res.locals.userInfo.uid){
        //busca la informacion de su usuario
        res.status(200).send(await getUser(uid))
        return //hacer send no hace que se deje de ejecutar 
    }
    //procesar request
    roleMiddleware([ROLE_ADMIN,ROLE_JURY,ROLE_MENTOR])(req,res,async ()=>{
        res.status(200).send(await getUser(uid))
    })
    return 
})


module.exports = router