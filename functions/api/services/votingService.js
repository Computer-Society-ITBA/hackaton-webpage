const { db, VOTE_COLLECTION, SUBMISSION_COLLECTION } = require("../firebaseConfig");

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

module.exports.adminVoteSubmission = async function adminVoteSubmission(
  submissionId,
  facilidad,
) {
    try {
        const submissionDocRed = db.doc(
          `/${SUBMISSION_COLLECTION}/${submissionId}`
        );
        const submissionDocSnapshot = await submissionDocRed.get();
        if (!submissionDocSnapshot.exists)
            return { error: "Submission not found." };

        // Check for existing vote by mentor for this submission
        const voteQuery = db
          .collection(`${VOTE_COLLECTION}`)
          .where("submissionId", "==", submissionId)
          .where("userId", "==", null);
        const voteSnapshot = await voteQuery.get();

        const data = {
            submissionId,
            facilidad,
        };

        // Handle existing vote scenario
        if (!voteSnapshot.empty) {
            const voteDoc = voteSnapshot.docs[0];
            await db.collection(`/${VOTE_COLLECTION}`).doc(voteDoc.id).set(data);
        }
        else {
            await db.collection(`/${VOTE_COLLECTION}`).add(data);
        }

        return { message: "Success" };
    } catch (error) {
        console.error(error);
        return { error: error.message };
    }
}
