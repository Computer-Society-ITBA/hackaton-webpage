const functions = require("firebase-functions");

const express = require('express')
const bodyParser = require('body-parser')
const api = require('./api/api')
const cors = require('cors')

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api', api);

// Expose used environment variables


exports.app = functions
    .runWith(['ADMIN_TYPE', 'ADMIN_PROJECT_ID', 'ADMIN_PRIVATE_KEY_ID', 
    'ADMIN_PRIVATE_KEY', 'ADMIN_CLIENT_EMAIL', 'ADMIN_CLIENT_ID', 
    'ADMIN_AUTH_URI', 'ADMIN_TOKEN_URI', 'ADMIN_PROVIDER_X509_CERT_URL',
    'ADMIN_CLIENT_X509_CERT_URL', 'CLIENT_API_KEY', 'CLIENT_AUTH_DOMAIN', 
    'CLIENT_PROJECT_ID', 'CLIENT_STORAGE_BUCKET', 'CLIENT_MESSAGING_SENDER_ID', 
    'CLIENT_APP_ID', 'CLIENT_MEASUREMENT_ID', 'SENDGRID_API_KEY' ])
    .https.onRequest(app);
