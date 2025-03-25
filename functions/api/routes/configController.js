const express = require("express");
const router = express.Router();
const {
    inscriptionsEnabled,
    submissionsEnabled,
    videoSubmissionsEnabled,
} = require("../services/configService");

router.get("", async (_, res) => {
    let inscriptions = await inscriptionsEnabled();
    let submissions = await submissionsEnabled();
    let videoSubmissions = await videoSubmissionsEnabled();
    res.status(200).send({
        inscriptions,
        submissions,
        videoSubmissions,
    });
});

module.exports = router;
