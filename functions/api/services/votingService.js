const { error } = require("../model/error");
const { db, VOTE_COLLECTION, USER_COLLECTION, SUBMISSION_COLLECTION } = require("../firebaseConfig");
const { adminAuth, clientAuth, createUserWithEmailAndPassword } = require("../firebaseConfig");
const { ROLE_MENTOR } = require("../middleware/roleMiddleware");
const {setRoleToMentor, setRoleToUser} = require("./authService");
const {setUserInfo} = require("./userService");
const { collection, query, where, getDocs } =  require("firebase/firestore");

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
        const votes = voteSnapshot.docs.map(doc => doc.data());
        return votes;
    }
    return []; // Return empty array if no votes found
};