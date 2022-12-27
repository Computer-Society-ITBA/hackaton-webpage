require('dotenv').config()
const path = require('path');
const admin = require("firebase-admin");
//por favor, si alguien encuentra una manera mas linda de hacer esto cambielo
//no queria hacer path relativo 
const serviceAccount = {
    type:                           process.env.ADMIN_TYPE,
    project_id:                     process.env.ADMIN_PROJECT_ID,
    private_key_id:                 process.env.ADMIN_PRIVATE_KEY_ID,
    private_key:                    process.env.ADMIN_PRIVATE_KEY,
    client_email:                   process.env.ADMIN_CLIENT_EMAIL,
    client_id:                      process.env.ADMIN_CLIENT_ID,
    auth_uri:                       process.env.ADMIN_AUTH_URI,
    token_uri:                      process.env.ADMIN_TOKEN_URI,
    auth_provider_x509_cert_url:    process.env.ADMIN_PROVIDER_X509_CERT_URL,
    client_x509_cert_url:           process.env.ADMIN_CLIENT_X509_CERT_URL
}
const app = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
const auth = app.auth()
module.exports = {auth}