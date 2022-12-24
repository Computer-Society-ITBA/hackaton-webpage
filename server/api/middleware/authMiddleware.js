const path = require('path');
const admin = require("firebase-admin");
//por favor, si alguien encuentra una manera mas linda de hacer esto cambielo
//no queria hacer path relativo 
const serviceAccount = require(path.join(process.cwd(),'hackitba-admin-config.json'));
const app = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
const auth = app.auth()

//Usar si se quire crear un token para testear
// const {initializeApp} = require('firebase/app')
// const { getAuth , signInWithEmailAndPassword} = require ("firebase/auth");
// const firebaseConfig = {
//     //completar con los datos que se obtienen en la configuracion del proyecto
//   };
  
//
// initializeApp(firebaseConfig);

function error(code,message){
    return {error:{
        code:code,
        message:message
    }}
}

function authMiddleware (req, res, next) {
    const authHeader = req.headers['authorization'] //no tengo idea por que si los pongo con A mayuscula no lo reconoce
    if(!authHeader){
        res.status(401).send(error(1,"Misising Authorization header"))
        return
    }
    const strings = authHeader.split(' ')
    if(!strings[1] ||  strings[0]!=='Bearer'){
        res.status(401).send(error(2,'Bad access token'))
        return
    }
    //Usar si se quire crear un token para testear
    // signInWithEmailAndPassword(getAuth(),"jmentasti@itba.edu.ar","TestUser22").then(()=>{
    //     getAuth().currentUser.getIdToken().then((token)=>{
    //         console.log(token)
    //     })
    // })

    //Debe ser un IdToken, no otro
    auth.verifyIdToken(strings[1])
        .then((decodedToken)=>{
            const uid = decodedToken.uid
            console.log(uid)
            next()
        })
        .catch((err)=>{
            console.log(err)
            res.status(401).send(error(3,"Invalid token"))
        })
}
module.exports = authMiddleware