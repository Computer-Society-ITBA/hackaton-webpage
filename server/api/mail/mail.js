const express = require('express')
const authMiddleware = require('../middleware/authMiddleware')
const router = express.Router()
const {roleMiddleware, ROLE_WEBPAGE} = require('../middleware/roleMiddleware')
const joi = require('joi');
const {error} = require('../util')
const schema = joi.object({
    email: joi.string().email(),
    subject: joi.string(),
    body: joi.string(),
})

const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

router.post('/send',authMiddleware,roleMiddleware([ROLE_WEBPAGE]),async (req, res)=>{
    const {email, subject, body} = req.body
    try{
        await schema.validateAsync({email,subject,body})
    }catch(err){
        return res.status(400).json(error(1,"Missing or invalid information"))
    }
    const msg = {
        to:'jmentasti@itba.edu.ar', //Mail CS
        from:'jrmenta2@gmail.com', //Mail cuenta Sendgrid
        subject: "from: " + email + ", subject: " + subject,
        text: body,
    }
    try{
        await sgMail.send(msg)
        return res.status(200).json({status:"success: email sent"})
    }catch(err){
        console.log(err.response.body.errors)
        return res.status(400).json(error(1,"Sendgrid error")) 
    }
    
})

module.exports = router