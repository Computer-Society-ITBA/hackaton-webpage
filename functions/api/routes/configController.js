const express = require("express");
const router = express.Router();
const {
    inscriptionsEnabled,
    submissionsEnabled,
} = require("../services/configService");

router.get("", async (_, res) => {
    let inscriptions = await inscriptionsEnabled();
    let submissions = await submissionsEnabled();

    res.status(200).send({
        inscriptions,
        submissions,
    });
});

module.exports = router;
