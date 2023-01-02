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
        return error(1,err)
    }
}

module.exports = {getUser}