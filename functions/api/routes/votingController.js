const express = require("express");
const {
    getVote
} = require("../services/votingService");

const router = express.Router()

router.get(
    "/",
    async(req, res) => {
        const mentorId = req.query.mentor
        const submissionId = req.query.submission
        const vote =  await getVote(submissionId, mentorId)
        if (vote.length === 0)
            return res.status(204).send()
        return res.status(200).send(vote)
    }
)

module.exports = router;