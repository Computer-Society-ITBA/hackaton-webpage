const express = require("express");
const {
    mentorVoteSubmission,
    assignSubmissionToMentor,
    createMentor,
    checkIfMentor,
    getMentorSubmissions,
    getAllMentors,
} = require("../services/mentorService");

const { getSingleSubmission } = require("../services/submissionsService");
const { mentor } = require("../model/mentor");
const vote = require("../model/vote");
const authMiddleware = require("../middleware/authMiddleware");
const bodySelfMiddleware = require("../middleware/bodySelfMiddleware");
const { roleMiddleware, ROLE_ADMIN } = require("../middleware/roleMiddleware");

const router = express.Router();

router.post(
    "/",
    // authMiddleware - Depende como querramos implementar el crear un mentor... se hace desde un admin?,
    async (req, res) => {
        try {

            const email = req.body.email
            const password = req.body.password
            const data = await createMentor(email, password);
            if (data.error) return res.status(400).send(error.data);
            return res.status(201).send("Mentor created");
        } catch (error) {
            return res.status(400).send(error);
        }
    }
);


router.put("/:mentorId/submissions", async (req, res) => {
    const mentorId = req.params.mentorId;
    console.log(mentorId);
    const isMentor = await checkIfMentor(mentorId);
    if (!isMentor) return res.status(400).send("User is not a mentor");

    const { submissions } = req.body;
    const data = await assignSubmissionToMentor(mentorId, submissions);
    if (data.error) return res.status(400).send(data.error);
    return res.status(201).send("Submissions assigned to mentor");
});


router.post("/:mentorId/votes", async (req, res) => {
    const mentorId = req.params.mentorId;
    const isMentor = await checkIfMentor(mentorId);

    //Deberia ser middleware?? dudas porque no siempre mismo comportamiento
    if (!isMentor) return res.status(400).send("User is not a mentor");

    const { submissionId, relevancia, creatividad, presentacion, descripcion } =
        req.body;

    const data = await mentorVoteSubmission(
        mentorId,
        submissionId,
        relevancia,
        creatividad,
        presentacion,
        descripcion
    );

    if (data.error) return res.status(400).send(data.error);
    return res.status(201).send("Vote registered");
});

router.get("/:mentorId/submissions", async (req, res) => {
    const mentorId = req.params.mentorId;
    const isMentor = await checkIfMentor(mentorId);

    //Deberia ser middleware??
    if (!isMentor) return res.status(400).send("User is not a mentor");

    const data = await getMentorSubmissions(mentorId);
    if (data.error) return res.status(400).send(data.error);
    return res.status(200).send(data);
});

router.get("/", async (req, res) => {
    const data = await getAllMentors();
    if (data.error) return res.status(400).send(data.error);
    return res.status(200).send(data);
});

module.exports = router;
