const {
    db,
    USER_COLLECTION,
    VOTE_COLLECTION,
    SUBMISSION_COLLECTION,
} = require("../firebaseConfig");

const xlsx = require("xlsx");

// TODO: Merge with userReport.js

const criteria = [
    "problematica",
    "relacion",
    "innovacion",
    "impacto",
    "facilidad",
    "interfaz",
    "mvp",
    "video",
];
const Criteria = [
    "Problemática",
    "Relación con la Temática",
    "Innovación y oportunidad",
    "Impacto y Alcance",
    "Facilidad de Ejecución",
    "Interfaz de usuario",
    "Calidad del MVP",
    "Presentación (video)",
];

const header = ["Mentor", ...Criteria, "Feedback"];
const processingHeader = [["", ...Criteria, "Total"]];

async function getVotes() {
    const votesCollection = db.collection(VOTE_COLLECTION);
    const usersCollection = db.collection(USER_COLLECTION);
    const submissionCollection = db.collection(SUBMISSION_COLLECTION);

    const votesIncomplete = (await votesCollection.get()).docs.map((doc) =>
        doc.data()
    );
    const votes = [];

    for (const vote of votesIncomplete) {
        const team = (
            await submissionCollection.doc(vote.submissionId).get()
        ).data().team;
        const mentor = (await usersCollection.doc(vote.userId).get()).data()
            .name;

        vote.team = team;
        vote.mentor = mentor;

        votes.push(vote);
    }

    const votesByTeam = votes.reduce((map, vote) => {
        (map[vote.team] ??= []).push(vote);
        return map;
    }, {});

    return votesByTeam;
}

function numToLetter(num) {
    const alphabetLength = 26;
    if (num >= 0 && num < alphabetLength) {
        return String.fromCharCode("A".charCodeAt(0) + num);
    }
    throw new Error(
        `Invalid argument: ${num}. Must be between 1 and ${alphabetLength}.`
    );
}

function createExcel(votes) {
    const excel = Object.values(votes).reduce((book, teamVotes) => {
        const teamName = teamVotes[0].team;

        const voteArray = teamVotes.reduce(
            (aoa, vote) => {
                const votes = Object.values(
                    criteria
                        .map((key) => ({ [key]: vote[key] }))
                        .reduce((acc, curr) => Object.assign(acc, curr), {})
                );

                aoa.push([vote.mentor, ...votes, vote.descripcion]);

                return aoa;
            },
            [header]
        );

        const sheet = xlsx.utils.aoa_to_sheet(voteArray);

        xlsx.utils.sheet_add_aoa(sheet, processingHeader, {
            origin: `A${teamVotes.length + 3}`,
        });

        const criteriaAverage = [...Array(criteria.length).keys()].map((i) => {
            const columnLetter = numToLetter(i + 1);

            const start = `${columnLetter}2`;
            const end = `${columnLetter}${teamVotes.length + 1}`;

            return { f: `AVERAGE(${start}:${end})` };
        });

        const total = {
            f: `SUM(B${teamVotes.length + 4}:${numToLetter(criteria.length + 1)}${teamVotes.length + 4}`,
        };

        xlsx.utils.sheet_add_aoa(
            sheet,
            [["Promedio", ...criteriaAverage, "", total]],
            {
                origin: `A${teamVotes.length + 4}`,
            }
        );

        xlsx.utils.book_append_sheet(book, sheet, teamName);

        return book;
    }, xlsx.utils.book_new());

    return xlsx.write(excel, { type: "buffer", bookType: "xlsx" });
}

async function getVoteReport() {
    const votes = await getVotes();

    return createExcel(votes);
}

module.exports = { getVoteReport };
