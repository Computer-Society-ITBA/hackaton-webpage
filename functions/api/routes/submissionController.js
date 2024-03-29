const express = require("express");
const {
    createSubmission,
    getSubmission,
    getSubmissions,
    getSingleSubmission,
} = require("../services/submissionsService");
const { schema } = require("../model/submission");
const { getUserInfo } = require("../services/userService");
const authMiddleware = require("../middleware/authMiddleware");
const bodySelfMiddleware = require("../middleware/bodySelfMiddleware");
const { roleMiddleware, ROLE_ADMIN } = require("../middleware/roleMiddleware");
const { submissionsOpenMiddleware } = require("../middleware/configMiddleware");

const router = express.Router();

router.post(
    "/",
    authMiddleware,
    bodySelfMiddleware,
    submissionsOpenMiddleware,
    async (req, res) => {
        const { error } = schema.validate(req.body);
        if (error) {
            return res.status(400).send(error.details[0].message);
        }

        try {
            const { error } = await getUserInfo(req.body.userId);
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
        } catch (err) {
            console.error(err);
            res.status(500).send(err);
        }
    }
);

router.get(
    "/",
    authMiddleware,
    roleMiddleware(ROLE_ADMIN),
    async (_, res) => {
        try {
            const submissions = await getSubmissions();
            if (submissions.length === 0)
                return res.status(204).send("No submissions found");

            res.status(200).send(submissions);
        } catch (err) {
            console.error(err);
            res.status(500).send(err);
        }
    }
);

router.get("/:submissionId", async (req, res) => {
    const submissionId = req.params.submissionId;
    try {
        const data = await getSingleSubmission(submissionId);
        return res.status(200).send(data);
    } catch {
        return res.status(400).send("Invalid submission ID");
    }
});

module.exports = router;
