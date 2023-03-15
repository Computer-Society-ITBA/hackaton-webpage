const { initializeApp } = require('firebase/app')
const { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, browserLocalPersistence } = require("firebase/auth");
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_CLIENT_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_CLIENT_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_CLIENT_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_CLIENT_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_CLIENT_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_CLIENT_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_CLIENT_MEASUREMENT_ID
};

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
//No se como poner el await aca!
auth.setPersistence(browserLocalPersistence)
module.exports = {auth}