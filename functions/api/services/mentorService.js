const { error } = require("../model/error");
const { db, VOTE_COLLECTION, USER_COLLECTION, SUBMISSION_COLLECTION } = require("../firebaseConfig");
const { adminAuth, clientAuth } = require("../firebaseConfig");
const { ROLE_MENTOR } = require("../middleware/roleMiddleware");

//Method that recieves a user and assigns him the mentor role. Also creates the mentor doc in de db.
module.exports.createMentor = async function createMentor(uid) {
    const data = {
        submissions: [],
        voted: false,
        mentor: true,
    };

    try {
        console.log("Assigning mentor role to user " + uid);
        await adminAuth.setCustomUserClaims(uid, { role: ROLE_MENTOR });
        console.log("Mentor role assigned to user " + uid);
    } catch (err) {
        console.log(err);
        return error(err.code, err.message);
    }

    try {
        db.collection(`/${USER_COLLECTION}`).doc(uid).update(data);
        return { data };
    } catch (err) {
        console.log(err);
        return error(err.code, err.message);
    }
};

module.exports.checkIfMentor = async function checkIfMentor(uid) {
    console.log("Checking if user is a mentor.");
    try {
        const userDoc = db.doc(`/${USER_COLLECTION}/${uid}`);
        const userDocSnapshot = await userDoc.get();
        if (!userDocSnapshot.exists) {
            return false;
        }
        const userRecord = await adminAuth.getUser(uid);
        const userClaims = userRecord.customClaims;
        if (userClaims && userClaims.role === "mentor") {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.error(error);
        return false;
    }
};

module.exports.assignSubmissionToMentor =
    async function assignSubmissionToMentor(mentorId, submissionId) {
        try {
            const userDoc = db.doc(`/${USER_COLLECTION}/${mentorId}`);
            const userDocSnapshot = await userDoc.get();
            if (!userDocSnapshot.exists) {
                return { error: "Mentor not found." };
            }

            const submissionDoc = db.doc(`/${SUBMISSION_COLLECTION}/${submissionId}`);
            const submissionDocSnapshot = await submissionDoc.get();
            if (!submissionDocSnapshot.exists) {
                return { error: "Submission not found." };
            }

            const mentorData = userDocSnapshot.data();

            if (
                mentorData.submissions &&
                mentorData.submissions.includes(submissionId)
            ) {
                return { error: "Submission already assigned to this mentor." };
            }
            const updatedSubmissionIds = mentorData.submissions
                ? [...mentorData.submissions, submissionId]
                : [submissionId];

            await userDoc.update({ submissions: updatedSubmissionIds });
            return { message: "Success" };
        } catch (error) {
            console.error(error);
            return { error: error.message };
        }
    };

module.exports.getMentorSubmissions = async function getMentorSubmissions(
    mentorId
) {
    try {
        const mentorDocRef = db.doc(`/${USER_COLLECTION}/${mentorId}`);
        const mentorDocSnapshot = await mentorDocRef.get();
        return { submissions: mentorDocSnapshot.data().submissions };
    } catch (error) {
        console.error(error);
        return { error: error.message };
    }
};

module.exports.mentorVoteSubmission = async function mentorVoteSubmission(
    mentorId,
    submissionId,
    relevancia,
    creatividad,
    presentacion,
    descripcion
) {
    try {
        const mentorDocRef = db.doc(`/${USER_COLLECTION}/${mentorId}`);
        const mentorDocSnapshot = await mentorDocRef.get();
        if (!mentorDocSnapshot.exists) {
            return { error: "Mentor not found." };
        }

        const mentorData = mentorDocSnapshot.data();

        if (mentorData.voted) {
            return { error: "Submission already voted by this mentor." };
        }

        const data = {
            userId: mentorId,
            submissionId: submissionId,
            relevancia: relevancia,
            creatividad: creatividad,
            presentacion: presentacion,
            descripcion: descripcion,
        };

        const ans = db.collection(`/${VOTE_COLLECTION}`).add(data);

        return { message: "Success" };
    } catch (error) {
        console.error(error);
        return { error: error.message };
    }
};

module.exports.getAllMentors = async function getAllMentors() {
    try {
        const mentors = [];
        const mentorsSnapshot = await db
            .collection(`/${USER_COLLECTION}`)
            .where("mentor", "==", true)
            .get();
        mentorsSnapshot.forEach((doc) => {
            mentors.push(doc.data());
        });
        return { mentors: mentors };
    } catch (error) {
        console.error(error);
        return { error: error.message };
    }
};
