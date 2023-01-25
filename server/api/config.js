require('dotenv').config()
const { getFirestore } = require("firebase/firestore")
const { getStorage, ref } = require("firebase/storage")
const admin = require("firebase-admin");
//por favor, si alguien encuentra una manera mas linda de hacer esto cambielo
//no queria hacer path relativo 
const serviceAccount = {
  type: process.env.ADMIN_TYPE,
  project_id: process.env.ADMIN_PROJECT_ID,
  private_key_id: process.env.ADMIN_PRIVATE_KEY_ID,
  private_key: process.env.ADMIN_PRIVATE_KEY,
  client_email: process.env.ADMIN_CLIENT_EMAIL,
  client_id: process.env.ADMIN_CLIENT_ID,
  auth_uri: process.env.ADMIN_AUTH_URI,
  token_uri: process.env.ADMIN_TOKEN_URI,
  auth_provider_x509_cert_url: process.env.ADMIN_PROVIDER_X509_CERT_URL,
  client_x509_cert_url: process.env.ADMIN_CLIENT_X509_CERT_URL
}
const app = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
const adminAuth = app.auth()


const { initializeApp } = require('firebase/app')
const { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } = require("firebase/auth");
const firebaseConfig = {
  apiKey: process.env.CLIENT_API_KEY,
  authDomain: process.env.CLIENT_AUTH_DOMAIN,
  projectId: process.env.CLIENT_PROJECT_ID,
  storageBucket: process.env.CLIENT_STORAGE_BUCKET,
  messagingSenderId: process.env.CLIENT_MESSAGING_SENDER_ID,
  appId: process.env.CLIENT_APP_ID,
  measurementId: process.env.CLIENT_MEASUREMENT_ID
};
const clientApp = initializeApp(firebaseConfig)
const clientAuth = getAuth(clientApp)
const db = getFirestore(clientApp)
const storage = getStorage(clientApp)
module.exports = { adminAuth, clientAuth, db, storage, ref, signInWithEmailAndPassword, createUserWithEmailAndPassword }