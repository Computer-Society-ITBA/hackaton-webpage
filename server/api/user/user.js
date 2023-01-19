const express = require('express')
const router = express.Router()
const {roleMiddleware, ROLE_ADMIN, ROLE_MENTOR, ROLE_JURY, ROLE_USER} = require('../middleware/roleMiddleware')
const {getUser, changePassword} = require('./auth_util')
const {error} = require('../util')
const {addMember, editMember, deleteMember, getMembers, editQualification} = require('./firestore_util')
const authMiddleware = require('../middleware/authMiddleware')
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
    return 
})
router.put('/:userId/password',async(req,res)=>{

})
//TODO: agregar middleware de auth cuando se haya mergeado con el de cambiar contraseña
router.put('/:userId/qualified',authMiddleware, roleMiddleware([ROLE_ADMIN]),async(req, res)=>{
    const qualifiedValue = req.body.qualified
    if(qualifiedValue===undefined){ // no hacer !qualified porque si mandan false entra
        return res.status(400).send(error(1,"Missing qualified body field")) 
    }
    const ans = await editQualification(res.locals.userInfo.uid,qualifiedValue)
    if(ans.error){
        return res.status(400).send(ans)
    }
    res.status(200).send(ans)
})
//Estas funciones son muy parecidas, despues veo como puedo juntarlo 
router.post('/:userId/members',authMiddleware,roleMiddleware([ROLE_USER]), async (req, res)=> {
    const {full_name, dni, email} = req.body 
    const uid = req.params.userId
    if(uid!==res.locals.userInfo.uid){
        return res.status(401).send(error(2,"Members can be created only by the team account"))
    }
    if(!full_name || !dni || !email){
        return res.status(400).json(error(1, "Missing member information"))
    }
    const ans = await addMember(res.locals.userInfo.uid, dni, email, full_name)
    if(ans.error){
        return res.status(400).send(ans)
    }
    res.status(200).send(ans)
})
router.patch('/:userId/members/:memberId',authMiddleware,roleMiddleware([ROLE_USER]), async (req, res)=> {
    const {full_name, dni, email} = req.body 
    const uid = req.params.userId
    const memberId = req.params.memberId
    if(uid!==res.locals.userInfo.uid){
        return res.status(401).send(error(2,"Members can be changed only by the team account"))
    }
    if(!full_name && !dni && !email){//damos error solo si no pasa info de algun campo
        return res.status(400).send(error(1, "Missing member information")) 
    }
    const ans = await editMember(uid, memberId, dni, email, full_name)
    if(ans.error){
        return res.status(400).send(ans)
    }
    res.status(200).send(ans)
})
router.delete('/:userId/members/:memberId',authMiddleware, roleMiddleware([ROLE_USER]), async(req, res)=>{
    const uid = req.params.userId
    const memberId = req.params.memberId
    if(uid!==res.locals.userInfo.uid){
        return res.status(401).send(error(2,"Members can be changed only by the team account"))
    }
    const ans = await deleteMember(uid, memberId)
    if(ans.error){
        return res.status(400).send(ans)
    }
    res.status(200).send(ans)
})
router.get('/:userId/members',authMiddleware,async(req, res)=>{
    const uid = req.params.userId
    if(uid===res.locals.userInfo.uid){
        const ans = await getMembers(uid)
        if(ans.error){
            return res.status(400).send(ans)
        }
        return res.status(200).send(ans)
    }
    roleMiddleware([ROLE_ADMIN, ROLE_JURY, ROLE_MENTOR])(req, res, async()=>{
        const ans = await getMembers(uid)
        if(ans.error){
            return res.status(400).send(ans)
        }
        res.status(200).send(ans)
    })
})
module.exports = router