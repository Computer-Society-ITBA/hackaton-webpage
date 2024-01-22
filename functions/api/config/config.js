const express = require("express");
const router = express.Router();
const { inscriptionsEnabled, submissionsEnabled } = require("./util");

router.get("", async (_, res) => {
    let inscriptions = await inscriptionsEnabled();
    let submissions = await submissionsEnabled();

    res.status(200).send({
        inscriptionsEnabled: inscriptions,
        submissionsEnabled: submissions,
    });
});

module.exports = router;
