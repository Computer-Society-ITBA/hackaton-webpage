const express = require('express')
const router = express.Router()
const {roleMiddleware, ROLE_ADMIN, ROLE_MENTOR, ROLE_JURY, ROLE_USER} = require('../middleware/roleMiddleware')
const {getUser, changePassword} = require('./auth_util')
const authMiddleware = require('../middleware/authMiddleware')
const selfMiddleware = require('../middleware/selfMiddleware')
const {error} = require('../util')
const {addMember, editMember, deleteMember, getMembers, editQualification, saveDocument} = require('./firestore_util')
const {schema} = require('./schema')
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });

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
    try{
        await schema.validateAsync({password: password})
    }catch(err){
        return res.status(400).send(error(1,"Missing or invalid password"))
    }
    const ans = await changePassword(uid,password)
    if(ans.error){
        return res.status(400).send(ans)
    }
    res.status(200).send(ans)
})
//TODO: agregar middleware de auth cuando se haya mergeado con el de cambiar contraseña
router.put('/:userId/qualified',authMiddleware, roleMiddleware([ROLE_ADMIN]),async(req, res)=>{
    const qualifiedValue = req.body.qualified
    try{
        await schema.validateAsync({qualified: qualifiedValue})
    }catch(err){
        return res.status(400).send(error(1,"Missing or invalid qualified body field")) 
    }
    const ans = await editQualification(res.locals.userInfo.uid,qualifiedValue)
    if(ans.error){
        return res.status(400).send(ans)
    }
    res.status(200).send(ans)
})
//Estas funciones son muy parecidas, despues veo como puedo juntarlo 
router.post('/:userId/members',authMiddleware,selfMiddleware,roleMiddleware([ROLE_USER]), async (req, res)=> {
    const {full_name, dni, email} = req.body 
    try{
        await schema.validateAsync({full_name: full_name, dni: dni, email: email})
    }catch(err){
        return res.status(400).json(error(1, "Missing or invalid member information"))
    }
    const ans = await addMember(res.locals.userInfo.uid, dni, email, full_name)
    if(ans.error){
        return res.status(400).send(ans)
    }
    res.status(200).send(ans)
})
router.patch('/:userId/members/:memberId',authMiddleware,selfMiddleware,roleMiddleware([ROLE_USER]), async (req, res)=> {
    const {full_name, dni, email} = req.body 
    const uid = req.params.userId
    const memberId = req.params.memberId
    try{
        await schema.validateAsync({full_name: full_name, dni: dni, email: email})
    }catch(err){
        return res.status(400).json(error(1, "Missing or invalid member information"))
    }
    const ans = await editMember(uid, memberId, dni, email, full_name)
    if(ans.error){
        return res.status(400).send(ans)
    }
    res.status(200).send(ans)
})
router.delete('/:userId/members/:memberId',authMiddleware,selfMiddleware, roleMiddleware([ROLE_USER]), async(req, res)=>{
    const uid = req.params.userId
    const memberId = req.params.memberId
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

router.post('/:userId/:memberId/documents',authMiddleware, upload.single('file'), async (req, res) => {
    if (!req.file) {
        return res.status(400).send('No se encontro un archivo.');
    }
    const response = await saveDocument(req.params.userId, req.params.memberId, req.file)
    if(response.error) {
        res.status(400).send(response);
        return 
    }
    res.status(200).send(response);
    return
})




module.exports = router