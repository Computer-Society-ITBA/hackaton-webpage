//Funciones utiles de users que interactuan con la api de firebase auth
const { adminAuth } = require("../firebaseConfig");
const {
    ROLE_ADMIN,
    ROLE_USER,
    ROLE_MENTOR,
    ROLE_JURY,
} = require("../middleware/roleMiddleware");
const { error } = require("../model/error");
const { getUserInfo, getMembers } = require("./userService");

function userToJson(user) {
    // formato que estaba previamente definido en getUser
    return {
        displayName: user.displayName,
        email: user.email,
        phoneNumber: user.phoneNumber,
        photoURL: user.photoURL,
        uid: user.uid,
        role: (user.customClaims ? user.customClaims : {}).role,
    };
}
async function getAllUserInfo(user) {
    const userInfo = await getUserInfo(user.uid);
    const userParticipants = await getMembers(user.uid);
    if (userInfo.error || userParticipants.error) return null;
    return {
        uid: user.uid,
        email: user.email,
        role: user?.customClaims?.role,
        name: userInfo?.data?.name,
        qualified: userInfo?.data?.qualified,
        teamDescription: userInfo?.data?.name,
        motivation: userInfo?.data?.motivation,
        participants: userParticipants?.map((participant) => {
            return {
                name: participant?.data?.full_name,
                DNI: participant?.data?.dni,
                email: participant?.data?.email,
                age: participant?.data?.age,
            };
        }),
    };
}
//No paso toda la informacion que nos da firebase para poder controlarlo nosotros
//Puede ser que nos pase cosas que no queremos mostrarle al usuario final
async function getUser(uid) {
    if (!uid) {
        return undefined;
    }
    try {
        const user = await adminAuth.getUser(uid);
        // const userInfo = await getUserInfo(uid) //esto es raro porque mezcla un poco de funcionalidad, despues lo puedo mejorar
        // if (userInfo.error) {
        //     throw new Error("Firestore error")
        // }
        // //lo del final es para no tener errores por si no tiene los claims
        // return {
        //     displayName: user.displayName,
        //     email: user.email,
        //     // phoneNumber: user.phoneNumber,
        //     photoURL: user.photoURL,
        //     uid: user.uid,
        //     role: user.customClaims?.role,
        //     qualified: userInfo.data?.qualified
        // }
        return getAllUserInfo(user);
    } catch (err) {
        return error(err.code, err.message);
    }
}

async function getUsers() {
    try {
        const users = await Promise.all(
            (await adminAuth.listUsers()).users.map(async (user) => {
                // const aux = userToJson(user)
                // const userInfo = await getUserInfo(user.uid)
                // const userParticipants = await getMembers(user.uid)
                // if (userInfo.error || userParticipants.error) return error(err.code, err.message)
                // return ({
                //     uid: aux.uid,
                //     email: aux.email,
                //     role: aux.role,
                //     name: userInfo?.data?.name,
                //     teamDescription: userInfo?.data?.name,
                //     motivation: userInfo?.data?.motivation,
                //     participants: userParticipants?.map(participant=>{
                //         return({name:participant?.data?.full_name, DNI: participant?.data?.dni, email:participant?.data?.email})
                //     })
                // })

                if (user)
                return await getAllUserInfo(user);
            })
        );

        // Agrego el filter pq tenemos usuarios creados sin equipo
        return users.filter((user) => user && user.name != null);
    } catch (err) {
        return error(err.code, err.message);
    }
}

async function changePassword(uid, newPassword) {
    if (!uid || !newPassword) {
        return error(2, "Missing uid or new password");
    }
    try {
        const user = await adminAuth.updateUser(uid, {
            password: newPassword,
        });
        return { uid: user.uid, passwordHash: user.passwordHash };
    } catch (err) {
        return error(err.code, err.message);
    }
}
async function setRoleTo(uid, role) {
    try {
        await adminAuth.setCustomUserClaims(uid, { role: role });
    } catch (err) {
        console.log(err);
        throw err; //para manejarlo desde el que lo llama
    }
}
async function setRoleToAdmin(uid) {
    await setRoleTo(uid, ROLE_ADMIN);
}
async function setRoleToJury(uid) {
    await setRoleTo(uid, ROLE_JURY);
}
async function setRoleToMentor(uid) {
    await setRoleTo(uid, ROLE_MENTOR);
}
async function setRoleToUser(uid) {
    await setRoleTo(uid, ROLE_USER);
}
module.exports = {
    getUser,
    getUsers,
    changePassword,
    userToJson,
    setRoleToUser,
    setRoleToMentor,
    setRoleToJury,
    setRoleToAdmin,
};
