const {db} = require('../config');
const {schema} = require('./schema');

const SUBMISSION_COLLECTION = 'submissions';

module.exports.createSubmission = async function createSubmission(submission) {
  try {
    const userDoc = await db.collection('users').doc(submission.userId).get();
    if (!userDoc.exists) {
        throw new Error("Invalid user ID");
    }
    submission.team = userDoc.data().name;
    submission.createdAt = new Date();

    const submissionRef = await db.collection(SUBMISSION_COLLECTION).add(submission);
    return { 
        id: submissionRef.id,
        ...submission
     };
  } catch (err) {
    console.log(err);
    throw new Error("Unable to create submission");
  }
}

module.exports.getSubmission = async function getSubmissionByUserId(userId) {
    try {
        const submissionRef = await db.collection(SUBMISSION_COLLECTION).where('userId', '==', userId).get();
        if (submissionRef.empty) {
            return null;
        }
        return submissionRef.docs.map(doc => ({id: doc.id, ...doc.data()}))[0];
    } catch (err) {
        throw new Error("Unable to get submission");
    }
}

module.exports.getSubmissions = async function getSubmissions() {
    try {
        const submissionsRef = await db.collection(SUBMISSION_COLLECTION).get();
        if (submissionsRef.empty) {
            return [];
        }
        return submissionsRef.docs.map(doc => ({id: doc.id, ...doc.data()}));
    } catch (err) {
        throw new Error("Unable to get submission");
    }
}
