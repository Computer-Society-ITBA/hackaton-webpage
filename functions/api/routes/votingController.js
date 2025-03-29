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
const selfMiddleware = require("../middleware/selfMiddleware");
const { easeVote } = require("../model/vote");
const { adminVoteSubmission } = require("../services/votingService");

const router = express.Router();

router.post(
  "/",
  authMiddleware,
  roleMiddleware(ROLE_ADMIN),
  async (req, res) => {

    const {
      submissionId,
      facilidad
    } = req.body;

    try {
      await easeVote.validateAsync({
        facilidad,
      });
    } catch (err) {
      console.log(err);
      return res
        .status(400)
        .json(error(1, "Missing or invalid information"));
    }

    const data = await adminVoteSubmission(
      submissionId,
      facilidad,
    );

    if (data.error) return res.status(400).send(data.error);
    return res.status(201).send("Vote registered");
  }
);

router.get(
    "/",
    authMiddleware,
    roleMiddleware([ROLE_MENTOR, ROLE_ADMIN]),
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
