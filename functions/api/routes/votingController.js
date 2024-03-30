const express = require("express");
const { getVote } = require("../services/votingService");
const { getVoteReport } = require("../services/voteReport");
const { error } = require("../model/error");
const authMiddleware = require("../middleware/authMiddleware");
const {
    roleMiddleware,
    ROLE_ADMIN,
    ROLE_MENTOR,
} = require("../middleware/roleMiddleware");

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

router.get(
    "/report",
    authMiddleware,
    roleMiddleware([ROLE_ADMIN]),
    async (req, res) => {
        try {
            const file = await getVoteReport();

            res.setHeader(
                "Content-Disposition",
                "attachment; filename=voteReport.xlsx"
            );
            res.setHeader(
                "Content-Type",
                "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            );

            res.status(200).send(file);
        } catch (_) {
            res.status(500).send(error(2, "Error producing report"));
        }
    }
);

module.exports = router;
