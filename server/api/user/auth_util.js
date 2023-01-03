//Funciones utiles de users que interactuan con la api de firebase auth
const {adminAuth} = require('../config')
const {error} = require('../util')


//No paso toda la informacion que nos da firebase para poder controlarlo nosotros
//Puede ser que nos pase cosas que no queremos mostrarle al usuario final 
async function getUser(uid){
    if(!uid){
        return undefined
    }
    try{
        const user = await adminAuth.getUser(uid)
        //lo del final es para no tener errores por si no tiene los claims 
        return {
            displayName:    user.displayName,
            email:          user.email,
            phoneNumber:    user.phoneNumber,
            photoURL:       user.photoURL,
            uid:            user.uid,
            role:           (user.customClaims?user.customClaims:{}).role
            }
    }catch(err){
        return error(err.code,err.message)
    }
}
async function changePassword(uid, newPassword){
    if(!uid || !newPassword){
        return error(2,"Missing uid or new password")
    }
    try{
        const user = await adminAuth.updateUser(uid,{
            password:newPassword
        })
        return {uid:user.uid, passwordHash: user.passwordHash}
    }catch(err){
        return error(err.code,err.message)
    }
}
module.exports = {getUser, changePassword}