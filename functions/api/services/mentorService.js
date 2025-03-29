const {
    db,
    VOTE_COLLECTION,
    USER_COLLECTION,
    SUBMISSION_COLLECTION,
} = require("../firebaseConfig");
const {
    clientAuth,
    createUserWithEmailAndPassword,
} = require("../firebaseConfig");
const { setRoleToMentor } = require("./authService");
const { setUserInfo } = require("./userService");

//Method that recieves a user and assigns him the mentor role. Also creates the mentor doc in de db.
async function createMentor(email, password, name) {
    //crear usuario como se cree en el register y darle los claims de mentor directo aca.
    const createdUser = await createUserWithEmailAndPassword(
        clientAuth,
        email,
        password
    );
    await setRoleToMentor(createdUser.user.uid);
    const data = await setUserInfo(createdUser.user.uid, {
        submissions: [],
        mentor: true,
        email: email,
        name: name,
    });
    if (data.error) throw data.error;
    console.log(createdUser.user.uid + " <- Created");
    return { message: "Success" };
}

async function assignSubmissionToMentor(mentorId, submissions) {
    try {
        const userDoc = db.doc(`/${USER_COLLECTION}/${mentorId}`);
        const userDocSnapshot = await userDoc.get();
        if (!userDocSnapshot.exists) {
            return { error: "Mentor not found." };
        }

        //delete duplicates from submissions
        const uniqueArray = new Set([...submissions]);
        for (const submission of uniqueArray) {
            const submissionDoc = db.doc(
                `/${SUBMISSION_COLLECTION}/${submission}`
            );
            const submissionDocSnapshot = await submissionDoc.get();
            if (!submissionDocSnapshot.exists) {
                return { error: "Submission: " + submission + " not found." };
            }
        }

        const newSubmissions = uniqueArray ? [...uniqueArray] : [];
        await userDoc.update({ submissions: newSubmissions });
        return { message: "Success" };
    } catch (error) {
        console.error(error);
        return { error: error.message };
    }
}

async function getMentorSubmissions(mentorId) {
    try {
        const mentorDocRef = db.doc(`/${USER_COLLECTION}/${mentorId}`);
        const mentorDocSnapshot = await mentorDocRef.get();
        return { submissions: mentorDocSnapshot.data().submissions };
    } catch (error) {
        console.error(error);
        return { error: error.message };
    }
}

async function mentorVoteSubmission(
    mentorId,
    submissionId,
    problematica,
    relacion,
    innovacion,
    impacto,
    interfaz,
    mvp,
    video,
    descripcion,
) {
    try {
        const mentorDocRef = db.doc(`/${USER_COLLECTION}/${mentorId}`);
        const mentorDocSnapshot = await mentorDocRef.get();
        if (!mentorDocSnapshot.exists) {
            return { error: "Mentor not found." };
        }

        const submissionDocRed = db.doc(
            `/${SUBMISSION_COLLECTION}/${submissionId}`
        );
        const submissionDocSnapshot = await submissionDocRed.get();
        if (!submissionDocSnapshot.exists)
            return { error: "Submission not found." };

        // Check for existing vote by mentor for this submission
        const voteQuery = db
            .collection(`${VOTE_COLLECTION}`)
            .where("userId", "==", mentorId)
            .where("submissionId", "==", submissionId);
        const voteSnapshot = await voteQuery.get();

        // Handle existing vote scenario
        if (!voteSnapshot.empty) {
            return { error: "User has already voted for this submission." };
        }

        const toWriteQuery = db
          .collection(`${VOTE_COLLECTION}`)
          .where("submissionId", "==", submissionId)
        const toWriteSnapshot = await toWriteQuery.get();
        if (toWriteSnapshot.empty) {
            return { error: "Admin still not submitted a vote for this submission." };
        }

        const data = {
            userId: mentorId,
            submissionId,
            problematica,
            relacion,
            innovacion,
            impacto,
            interfaz,
            mvp,
            video,
            descripcion,
        };

        await db.collection(`/${VOTE_COLLECTION}`).add(data);

        return { message: "Success" };
    } catch (error) {
        console.error(error);
        return { error: error.message };
    }
}

async function getAllMentors() {
    try {
        const mentors = [];
        const mentorsSnapshot = await db
            .collection(`/${USER_COLLECTION}`)
            .where("mentor", "==", true)
            .get();
        mentorsSnapshot.forEach((doc) => {
            const mentor = doc.data();

            mentor.id = doc.id;
            mentors.push(mentor);
        });
        return { mentors: mentors };
    } catch (error) {
        console.error(error);
        return { error: error.message };
    }
}

module.exports = {
    createMentor,
    assignSubmissionToMentor,
    getMentorSubmissions,
    mentorVoteSubmission,
    getAllMentors,
};
