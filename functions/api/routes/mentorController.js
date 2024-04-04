const express = require("express");
const {
    mentorVoteSubmission,
    assignSubmissionToMentor,
    createMentor,
    getMentorSubmissions,
    getAllMentors,
} = require("../services/mentorService");
const { sendMentorEmail } = require("../services/emailService");

const { mentor } = require("../model/mentor");
const { vote } = require("../model/vote");
const authMiddleware = require("../middleware/authMiddleware");

const {
    roleMiddleware,
    ROLE_ADMIN,
    ROLE_MENTOR,
} = require("../middleware/roleMiddleware");
const { error } = require("../model/error");
const selfMiddleware = require("../middleware/selfMiddleware");

const router = express.Router();

router.post(
    "/",
    authMiddleware,
    roleMiddleware(ROLE_ADMIN),
    async (req, res) => {
        try {
            const { email, password, name } = req.body;
            try {
                await mentor.validateAsync({ email, password, name });
            } catch (err) {
                console.log(err);
                return res
                    .status(400)
                    .json(error(1, "Missing or invalid information"));
            }

            const result = await createMentor(email, password, name);

            if (result.error) return res.status(400).send(result.error);

            await sendMentorEmail(email, password);

            return res.status(201).send("Mentor created");
        } catch (error) {
            return res.status(400).send(error);
        }
    }
);

router.put(
    "/:userId/submissions",
    authMiddleware,
    roleMiddleware(ROLE_ADMIN),
    async (req, res) => {
        const mentorId = req.params.userId;

        const { submissions } = req.body;
        const data = await assignSubmissionToMentor(mentorId, submissions);
        if (data.error) return res.status(400).send(data.error);
        return res.status(201).send("Submissions assigned to mentor");
    }
);

router.post(
    "/:userId/votes",
    authMiddleware,
    roleMiddleware(ROLE_MENTOR),
    selfMiddleware,
    async (req, res) => {
        const mentorId = req.params.userId;

        const {
            submissionId,
            problematica,
            innovacion,
            impacto,
            interfaz,
            mvp,
            tematica,
            video,
            descripcion,
        } = req.body;

        try {
            await vote.validateAsync({
                problematica,
                innovacion,
                impacto,
                interfaz,
                mvp,
                tematica,
                video,
                descripcion,
            });
        } catch (err) {
            console.log(err);
            return res
                .status(400)
                .json(error(1, "Missing or invalid information"));
        }

        const data = await mentorVoteSubmission(
            mentorId,
            submissionId,
            problematica,
            innovacion,
            impacto,
            interfaz,
            mvp,
            tematica,
            video,
            descripcion
        );

        if (data.error) return res.status(400).send(data.error);
        return res.status(201).send("Vote registered");
    }
);

router.get(
    "/:userId/submissions",
    authMiddleware,
    roleMiddleware(ROLE_MENTOR),
    selfMiddleware,
    async (req, res) => {
        const mentorId = req.params.userId;

        const data = await getMentorSubmissions(mentorId);
        if (data.error) return res.status(400).send(data.error);
        return res.status(200).send(data);
    }
);

router.get("/", authMiddleware, roleMiddleware(ROLE_ADMIN), async (_, res) => {
    const data = await getAllMentors();
    if (data.error) return res.status(400).send(data.error);
    return res.status(200).send(data);
});

module.exports = router;
