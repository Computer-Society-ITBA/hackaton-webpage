const express = require("express");
const router = express.Router();
const userController = require("./routes/userController");
const emailController = require("./routes/emailController");
const submissionController = require("./routes/submissionController");
const configController = require("./routes/configController");
const mentorController = require("./routes/mentorController");
const voteController = require("./routes/votingController");
// /api endpoints
router.use("/users", userController);
router.use("/mail", emailController);
router.use("/submissions", submissionController);
router.use("/config", configController);
router.use("/mentors", mentorController);
router.use("/votes", voteController);

router.get("/test", (req, res) => {
    res.status(200).send({ message: "Hello Api!" });
});

module.exports = router;
