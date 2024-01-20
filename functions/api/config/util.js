const { db } = require("../config");

async function getDateConfig(config) {
    const query = await db.doc(`/config/${config}`).get();
    const data = query.data();

    const start = data.start.toDate();
    const end = data.end.toDate();

    const now = Date.now();

    return now >= start && now <= end;
}

async function inscriptionsEnabled() {
    return await getDateConfig("inscriptions");
}

async function submissionsEnabled() {
    return await getDateConfig("submissions");
}

module.exports = { inscriptionsEnabled, submissionsEnabled };
