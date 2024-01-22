const { adminAuth } = require("../config");
const { error } = require("../util");

async function authMiddleware(req, res, next) {
    const authHeader = req.headers["authorization"]; //no tengo idea por que si los pongo con A mayuscula no lo reconoce
    if (!authHeader) {
        return res.status(401).send(error(1, "Misising Authorization header"));
    }
    const strings = authHeader.split(" ");
    if (strings.length !== 2 || !strings[1] || strings[0] !== "Bearer") {
        return res.status(401).send(error(2, "Bad access token"));
    }

    //Debe ser un IdToken, no otro
    try {
        const decodedToken = await adminAuth.verifyIdToken(strings[1]);
        res.locals.userInfo = decodedToken;
        next();
    } catch (err) {
        console.log(err);
        res.status(401).send(error(err.code, err.message));
    }
}
module.exports = authMiddleware;
