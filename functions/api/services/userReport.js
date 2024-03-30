const xlsx = require("xlsx");
const { getUsers } = require("./authService");

// TODO: Merge with voteReport.js

function createExcel(users) {
    const header = [
        "Email",
        "Team Name",
        "Qualified",
        "Description",
        "Motivation",
        "Uid",
        "P1 Name",
        "P1 DNI",
        "P1 Email",
        "P1 age",
        "P2 Name",
        "P2 DNI",
        "P2 Email",
        "P2 age",
        "P3 Name",
        "P3 DNI",
        "P3 Email",
        "P3 age",
        "P4 Name",
        "P4 DNI",
        "P4 Email",
        "P4 age",
    ];

    const aoa = users.map((user) => {
        return [
            user.email,
            user.name,
            Boolean(user.qualified),
            user.teamDescription,
            user.motivation,
            user.uid,
            user.participants.map((p) => Object.values(p)),
        ].flat(2);
    });

    aoa.unshift(header);

    const excel = xlsx.utils.book_new();

    let sheet = xlsx.utils.aoa_to_sheet(aoa);

    xlsx.utils.book_append_sheet(excel, sheet, "All users");

    return xlsx.write(excel, { type: "buffer", bookType: "xlsx" });
}

async function getUsersReport(qualifiedOnly) {
    const allUsers = await getUsers();

    const users = allUsers
        .filter((u) => u.role === "user")
        .filter((u) => (qualifiedOnly ? u.qualified : true));

    return createExcel(users);
}

module.exports = { getUsersReport };
