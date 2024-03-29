const express = require("express");
const router = express.Router();
const joi = require("joi");
const { error } = require("../model/error");
const schema = joi.object({
    email: joi.string().email(),
    subject: joi.string(),
    body: joi.string(),
});

const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

router.post("/send", async (req, res) => {
    const { email, subject, body } = req.body;
    try {
        await schema.validateAsync({ email, subject, body });
    } catch (err) {
        return res.status(400).json(error(1, "Missing or invalid information"));
    }
    const msg = {
        to: "computersociety@itba.edu.ar", //Mail CS
        from: "no-reply@hackitba.com.ar", //Mail cuenta Sendgrid
        subject: "from: " + email + ", subject: " + subject,
        text: body,
    };
    try {
        await sgMail.send(msg);
        return res.status(200).json({ status: "success: email sent" });
    } catch (err) {
        console.log(err.response.body.errors);
        return res.status(400).json(error(1, "Sendgrid error"));
    }
});

module.exports = router;
