const express = require("express");
const router = express.Router();
const user = require("./user/user");
// const test_config = require('./test/test_config')
// const test_role_middleware = require('./test/test_role')
const mail = require("./mail/mail");
const submission = require("./submission/submission");
const config = require("./config/config");

// /api endpoints
// router.use('/test/config', test_config)
router.use("/users", user);
router.use("/mail", mail);
router.use("/submissions", submission);
router.use("/config", config);

router.get("/test", (req, res) => {
    res.status(200).send({ message: "Hello Api!" });
});

module.exports = router;
