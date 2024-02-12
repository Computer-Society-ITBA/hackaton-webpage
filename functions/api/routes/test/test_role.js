const express = require("express");
const router = express.Router();
const authMiddleware = require("../../middleware/authMiddleware");
const {
    roleMiddleware,
    ROLE_ADMIN,
    ROLE_JURY,
    ROLE_MENTOR,
    ROLE_USER,
} = require("../../middleware/roleMiddleware");
// endpoints to test privilege middleware
router.get(
    "/admin",
    authMiddleware,
    roleMiddleware([ROLE_ADMIN]),
    (req, res) => {
        res.status(200).send({ message: "Hello Admin!" });
    }
);
router.get("/jury", authMiddleware, roleMiddleware([ROLE_JURY]), (req, res) => {
    res.status(200).send({ message: "Hello Jury!" });
});
router.get(
    "/mentor",
    authMiddleware,
    roleMiddleware([ROLE_MENTOR]),
    (req, res) => {
        res.status(200).send({ message: "Hello Mentor!" });
    }
);
router.get("/user", authMiddleware, roleMiddleware([ROLE_USER]), (req, res) => {
    res.status(200).send({ message: "Hello User!" });
});
router.get(
    "/admin_or_jury",
    authMiddleware,
    roleMiddleware([ROLE_ADMIN, ROLE_JURY]),
    (req, res) => {
        res.status(200).send({ message: "Hello Admin Or Jury!" });
    }
);
module.exports = router;
