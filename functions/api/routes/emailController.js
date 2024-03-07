const express = require("express");
const router = express.Router();
const joi = require("joi");
const { error } = require("../model/error");
const { sendContactEmail } = require("../services/emailService");
const schema = joi.object({
    email: joi.string().email(),
    subject: joi.string(),
    body: joi.string(),
});

router.post("/send", async (req, res) => {
    const { email, userSubject, body } = req.body;
    try {
        await schema.validateAsync({ email, subject, body });
    } catch (err) {
        return res.status(400).json(error(1, "Missing or invalid information"));
    }

    const subject = `from: ${email}, subject: ${userSubject}`;
    try {
        sendContactEmail(subject, body);
        return res.status(200).json({ status: "success: email sent" });
    } catch (err) {
        console.log(err.response.body.errors);
        return res.status(400).json(error(1, "Sendgrid error"));
    }
});

module.exports = router;
