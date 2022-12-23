const express = require('express')
const router = express.Router()

// /user endpoints
router.get('/hello',(req,res)=>{
    res.status(200).send({message:'Hello User!'})
})

module.exports = router