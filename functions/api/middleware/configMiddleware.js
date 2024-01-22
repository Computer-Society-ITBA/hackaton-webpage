const { inscriptionsEnabled, submissionsEnabled } = require("../config/util");
const { error } = require("../util");

function inscriptionsOpenMiddleware(_, res, next) {
    if (!inscriptionsEnabled()) {
        return res.status(403).send(error(2, "Inscriptions are not open yet!"));
    }

    next();
}

function submissionsOpenMiddleware(_, res, next) {
    if (!submissionsEnabled()) {
        return res.status(403).send(error(2, "Submissions are not open yet!"));
    }

    next();
}

module.exports = { inscriptionsOpenMiddleware, submissionsOpenMiddleware };
