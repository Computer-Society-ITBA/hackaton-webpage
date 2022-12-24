const express = require('express')
const router = express.Router()
const user = require('./user/user')
const authMiddleware = require('./middleware/authMiddleware')
// /api endpoints
router.use('/user',authMiddleware,user) //el middleware aca es para testear

router.get('/hello',(req,res)=>{
    res.status(200).send({message:'Hello Api!'})
})

module.exports = router