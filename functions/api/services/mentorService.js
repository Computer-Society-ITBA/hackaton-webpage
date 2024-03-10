const { error } = require("../model/error");
const { db, VOTE_COLLECTION, USER_COLLECTION, SUBMISSION_COLLECTION } = require("../firebaseConfig");
const { adminAuth, clientAuth, createUserWithEmailAndPassword } = require("../firebaseConfig");
const { ROLE_MENTOR } = require("../middleware/roleMiddleware");
const {setRoleToMentor, setRoleToUser} = require("./authService");
const {setUserInfo} = require("./userService");
const { collection, query, where, getDocs } =  require("firebase/firestore");

//Method that recieves a user and assigns him the mentor role. Also creates the mentor doc in de db.
module.exports.createMentor = async function createMentor(email, password) {
    //crear usuario como se cree en el register y darle los claims de mentor directo aca.
    const createdUser = await createUserWithEmailAndPassword(clientAuth, email, password)
    await setRoleToMentor(createdUser.user.uid)
    const data =  await setUserInfo(createdUser.user.uid, {submissions: [], mentor:true, email: email, voted:[]})
    if(data.error) throw data.error
    console.log(createdUser.user.uid + " <- Created")
    return { message: "Success" };
};

module.exports.checkIfMentor = async function checkIfMentor(uid) {
    console.log("Checking if user is a mentor.");
    try {
        const userDoc = db.doc(`/${USER_COLLECTION}/${uid}`);
        const userDocSnapshot = await userDoc.get();
        if (!userDocSnapshot.exists) {
            console.log("User doesnt exist.");
            return false;
        }
        const userRecord = await adminAuth.getUser(uid);
        const userClaims = userRecord.customClaims;
        if (userClaims && userClaims.role === "mentor") {
            return true;
        } 
            console.log("No tiene el rol.")
            return false;
        
    } catch (error) {
        console.error(error);
        return false;
    }
};

module.exports.assignSubmissionToMentor =
    async function assignSubmissionToMentor(mentorId, submissions) {
        try {
            const userDoc = db.doc(`/${USER_COLLECTION}/${mentorId}`);
            const userDocSnapshot = await userDoc.get();
            if (!userDocSnapshot.exists) {
                return { error: "Mentor not found." };
            }

            //delete duplicates from submissions
            const uniqueArray = new Set([...submissions])
            console.log("entrando")
            for (const submission of uniqueArray) {
                console.log("Entreeeee", submission)
                const submissionDoc = db.doc(`/${SUBMISSION_COLLECTION}/${submission}`);
                const submissionDocSnapshot = await submissionDoc.get();
                if (!submissionDocSnapshot.exists) {
                    return { error: "Submission: " + submission +  " not found." };
                }
            }


            const newSubmissions = uniqueArray ? [...uniqueArray] : [];
            await userDoc.update({ submissions: newSubmissions});
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

        const submissionDocRed = db.doc(`/${SUBMISSION_COLLECTION}/${submissionId}`)
        const submissionDocSnapshot = await submissionDocRed.get()
        if (!submissionDocSnapshot.exists)
            return {error: "Submission not found."}

        
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
            const mentor = doc.data();

            mentor.id = doc.id;
            mentors.push(mentor);
        });
        return { mentors: mentors };
    } catch (error) {
        console.error(error);
        return { error: error.message };
    }
};
