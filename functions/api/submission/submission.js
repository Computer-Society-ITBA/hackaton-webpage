const express = require('express');
const { createSubmission, getSubmission } = require('./firestore_util');
const { schema } = require('./schema');
const { getUserInfo } = require('../user/firestore_util');
const authMiddleware = require('../middleware/authMiddleware');
const bodySelfMiddleware = require('../middleware/bodySelfMiddleware');

const router = express.Router();

router.post('/', authMiddleware, bodySelfMiddleware, async (req, res) => {
    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    try {
        const {error} = await getUserInfo(req.body.userId);
        if (error) {
            return res.status(400).send("Invalid user ID");
        }
    } catch (err) {
        return res.status(400).send("Invalid user ID");
    }

    try {
        const submission = await getSubmission(req.body.userId);
        if (submission) {
            return res.status(400).send("User already submitted");
        }
    } catch (err) {
        return res.status(400).send("User already submitted");
    }



    try {
        const submission = await createSubmission(req.body);
        res.status(200).send(submission);
    } catch(err) {
        console.error(err);
        res.status(500).send(err);
    }
});

router.get('/', async (req, res) => {
    res.send('Hello World!');
});

module.exports = router;
