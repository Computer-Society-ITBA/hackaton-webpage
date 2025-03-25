const {
    inscriptionsEnabled,
    submissionsEnabled,
    videoSubmissionsEnabled,
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

async function videoSubmissionsOpenMiddleware(req, res, next) {
    if (!(await videoSubmissionsEnabled())) {
        return res
            .status(403)
            .send(error("config", "Video submissions are not open yet!"));
    }

    next();
}

module.exports = { inscriptionsOpenMiddleware, submissionsOpenMiddleware, videoSubmissionsOpenMiddleware };
