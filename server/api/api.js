const express = require('express')
const router = express.Router()
const user = require('./user/user')
// /api endpoints
router.use('/user',user)

router.get('/hello',(req,res)=>{
    res.status(200).send({message:'Hello Api!'})
})

module.exports = router