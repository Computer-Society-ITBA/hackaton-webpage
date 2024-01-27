const {
    inscriptionsEnabled,
    submissionsEnabled,
} = require("../services/configService");
const { error } = require("../model/error");

async function inscriptionsOpenMiddleware(req, res, next) {
    if (!(await inscriptionsEnabled())) {
        return res
            .status(403)
            .send(error("config", "Inscriptions are not open yet!"));
    }

    next();
}

async function submissionsOpenMiddleware(req, res, next) {
    if (!(await submissionsEnabled())) {
        return res
            .status(403)
            .send(error("config", "Submissions are not open yet!"));
    }

    next();
}

module.exports = { inscriptionsOpenMiddleware, submissionsOpenMiddleware };
