const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp(functions.config().firebase);

exports.helloWorld = functions.https.onRequest((request, response) => {
 response.send("Hello from Firebase!");
});

const express = require('express');
const app = express();

app.get('/timestamp', (request, response) => {
    response.send(`Express timestamp: ${Date.now()}`);
 });

app.get('/auth', (req, res) => {
    try {                
        const tokenId = req.get('Authorization').split('Bearer ')[1];
        admin.auth().verifyIdToken(tokenId).then((verified)=>{            
            return admin.auth().getUser(verified.uid);
        })
        .then((user) => {            
            res.send(user.email).end();
        })        
        .catch((e)=>{
            res.send('e' + e);
        });
    } catch (e) {
        // response.status(401).end();
        res.send('error' + e);
    }
 });




 
exports.app = functions.https.onRequest(app);