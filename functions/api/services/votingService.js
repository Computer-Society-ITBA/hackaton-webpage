const { error } = require("../model/error");
const { db, VOTE_COLLECTION, USER_COLLECTION, SUBMISSION_COLLECTION } = require("../firebaseConfig");
const { adminAuth, clientAuth, createUserWithEmailAndPassword } = require("../firebaseConfig");
const { ROLE_MENTOR } = require("../middleware/roleMiddleware");
const {setRoleToMentor, setRoleToUser} = require("./authService");
const {setUserInfo} = require("./userService");
const { collection, query, where, getDocs } =  require("firebase/firestore");

module.exports.getVote = async function getVote(submissionId, mentorId) {
    const voteQuery = db
        .collection(`${VOTE_COLLECTION}`)
        .where("userId", "==", mentorId)
        .where("submissionId", "==", submissionId);
    const voteSnapshot = await voteQuery.get();

    // Handle existing vote scenario
    if (!voteSnapshot.empty) {
         // Map data from each doc
        return voteSnapshot.docs.map(doc => doc.data());
    }
    return []; // Return empty array if no votes found
}