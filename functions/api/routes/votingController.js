const express = require("express");
const { getVote } = require("../services/votingService");
const authMiddleware = require("../middleware/authMiddleware");
const { roleMiddleware, ROLE_MENTOR } = require("../middleware/roleMiddleware");

const router = express.Router();

router.get(
    "/",
    authMiddleware,
    roleMiddleware(ROLE_MENTOR),
    async (req, res) => {
        const mentorId = req.query.mentor;
        const submissionId = req.query.submission;
        const vote = await getVote(submissionId, mentorId);
        if (vote.length === 0) return res.status(204).send();
        return res.status(200).send(vote);
    }
);

module.exports = router;
