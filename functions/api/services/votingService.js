const { db, VOTE_COLLECTION } = require("../firebaseConfig");

module.exports.getVote = async function getVote(submissionId, mentorId) {
    var voteQuery = db.collection(`${VOTE_COLLECTION}`);

    // Build query based on provided filters (optional)
    if (submissionId) {
        voteQuery = voteQuery.where("submissionId", "==", submissionId);
    }
    if (mentorId) {
        voteQuery = voteQuery.where("userId", "==", mentorId);
    }

    const voteSnapshot = await voteQuery.get();

    // Handle existing vote scenario
    if (!voteSnapshot.empty) {
        const votes = voteSnapshot.docs.map((doc) => doc.data());
        return votes;
    }
    return []; // Return empty array if no votes found
};
