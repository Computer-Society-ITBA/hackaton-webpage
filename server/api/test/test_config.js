const express = require('express')
const router = express.Router()
const {adminAuth, clientAuth} = require('../config')
require('dotenv').config()
const {error} = require('../util')
const authMiddleware = require('../middleware/authMiddleware')
const { signInWithEmailAndPassword} = require ("firebase/auth");
const {ROLE_ADMIN, ROLE_JURY,ROLE_MENTOR, ROLE_USER} = require('../middleware/roleMiddleware')

//endpoints to test middlewares by changing user's role
router.get('/get_test_token',async (req,res)=>{
    try{
        await signInWithEmailAndPassword(clientAuth,process.env.TEST_USER_EMAIL,process.env.TEST_USER_PASSWORD)
        const token = await clientAuth.currentUser.getIdToken()
        res.status(200).send({token:token})
    }catch(err){
        console.log(err)
        res.status(401).send(error(3,"Error getting the token"))
    }
})
router.get('/get_uid',authMiddleware,(req,res)=>{
    res.status(200).send({uid:res.locals.userInfo.uid})
})
router.put('/set_role_to_admin',authMiddleware,async (req, res)=>{
    const uid = res.locals.userInfo.uid 
    try{
        await adminAuth.setCustomUserClaims(uid, {role:ROLE_ADMIN})
        res.status(200).send({message:"success"})
    }catch(err){
        console.log(err)
        res.status(401).send(error(3,"Custom Claims error"))
    }
})
router.put('/set_role_to_jury',authMiddleware,async (req, res)=>{
    const uid = res.locals.userInfo.uid 
    try{
        await adminAuth.setCustomUserClaims(uid, {role:ROLE_JURY})
        res.status(200).send({message:"success"})
    }catch(err){
        console.log(err)
        res.status(401).send(error(3,"Custom Claims error"))
    }
})
router.put('/set_role_to_mentor',authMiddleware,async (req, res)=>{
    const uid = res.locals.userInfo.uid 
    try{
        await adminAuth.setCustomUserClaims(uid, {role:ROLE_MENTOR})
        res.status(200).send({message:"success"})
    }catch(err){
        console.log(err)
        res.status(401).send(error(3,"Custom Claims error"))
    }
})
router.put('/set_role_to_user',authMiddleware,async (req, res)=>{
    const uid = res.locals.userInfo.uid 
    try{
        await adminAuth.setCustomUserClaims(uid, {role:ROLE_USER})
        res.status(200).send({message:"success"})
    }catch(err){
        console.log(err)
        res.status(401).send(error(3,"Custom Claims error"))
    }
})
module.exports = router