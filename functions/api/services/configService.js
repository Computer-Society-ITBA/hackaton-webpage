const { db } = require("../firebaseConfig");

async function getDateConfig(config) {
    const query = await db.doc(`/config/${config}`).get();
    const data = query.data();

    const start = data.start.toDate();
    const end = data.end.toDate();

    const now = Date.now();

    const enabled = now >= start && now <= end;

    return { start, end, enabled };
}

async function inscriptionsEnabled() {
    return await getDateConfig("inscriptions");
}

async function submissionsEnabled() {
    return await getDateConfig("submissions");
}
async function videoSubmissionsEnabled() {
    return await getDateConfig("submissions");
}

module.exports = { inscriptionsEnabled, submissionsEnabled, videoSubmissionsEnabled};
