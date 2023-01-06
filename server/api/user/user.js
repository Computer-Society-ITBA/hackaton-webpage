const express = require('express')
const router = express.Router()
const { roleMiddleware, ROLE_ADMIN, ROLE_MENTOR, ROLE_JURY } = require('../middleware/roleMiddleware')
const { getUser, getUsers, changePassword } = require('./auth_util')
const { error } = require('../util')
const { auth } = require('firebase-admin')
const { adminAuth, clientAuth } = require('../config')
const { signInWithEmailAndPassword } = require("firebase/auth");


// Todos los endpoints necesitan autenticacion (se require en el nivel de api.js)
// /user endpoints

router.get('/hello', (req, res) => {
    res.status(200).send({ message: 'Hello User2!' })
})

router.get('/login', async (req, res) => {
    // SOLO algunos roles deberían poder acceder
    //lista todos los usuarios  
    try {
        const { password, ...user } = req.body
        await clientAuth.signInWithEmailAndPassword()
        const token = await clientAuth.currentUser.getIdToken()
        res.status(200).send({ token: token })
    } catch (err) {
        console.log(err)
        res.status(401).send(error(3, "Error getting the token"))
    }

})

router.post('/', async (req, res) => {
    // SOLO algunos roles deberían poder acceder
    //lista todos los usuarios  
    const { password, ...user } = req.body
    const users = (await getUsers())
    if (users.some((elem) => elem.email === user.email)) {
        res.status(400).send({ 'result': 'User already exists' })
        return
    }

    const createdUser = await adminAuth.createUser({
        email: user.email,
        password: password,
    })
    res.status(200).send({ 'users': await getUser(createdUser.uid) })
    return //hacer send no hace que se deje de ejecutar 

})

router.get('/', async (req, res) => {
    // SOLO algunos roles deberían poder acceder
    //lista todos los usuarios  
    const ans = (await getUsers())
    if (ans.error) {
        res.status(404).send({ 'result': ans })
        return
    }
    res.status(200).send({ 'users': ans })
    return //hacer send no hace que se deje de ejecutar 

})
router.get('/:userId', async (req, res) => {
    const uid = req.params.userId
    if (uid === res.locals.userInfo.uid) {
        //busca la informacion de su usuario
        const ans = (await getUser(uid))
        if (ans.error) {
            res.status(404).send(ans)
            return
        }
        res.status(200).send(ans)
        return //hacer send no hace que se deje de ejecutar 
    }
    //procesar request
    roleMiddleware([ROLE_ADMIN, ROLE_JURY, ROLE_MENTOR])(req, res, async () => {
        const ans = (await getUser(uid))
        if (ans.error) {
            res.status(404).send(ans)
            return
        }
        res.status(200).send(ans)
    })
    return
})
router.put('/:userId/password', async (req, res) => {

})

module.exports = router