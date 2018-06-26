const functions = require('firebase-functions');

exports.helloWorld = functions.https.onRequest((request, response) => {
 response.send("Hello from Firebase!");
});

// express server exported as server function "app"

const express = require('express');
const app = express();

app.get('/timestamp', (request, response) => {
    response.send(`Express timestamp: ${Date.now()}`);
 });
 
exports.app = functions.https.onRequest(app);