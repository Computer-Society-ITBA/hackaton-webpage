const express = require("express");
const router = express.Router();
const userController = require("./routes/userController");
const emailController = require("./routes/emailController");
const submissionController = require("./routes/submissionController");

// /api endpoints
// router.use("/test/config", test_config);
router.use("/users", userController);
router.use("/mail", emailController);
router.use("/submissions", submissionController);

router.get("/test", (req, res) => {
    res.status(200).send({ message: "Hello Api!" });
});

module.exports = router;
