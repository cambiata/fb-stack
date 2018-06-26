Test repo for web stack using Haxe, Firebase and Mithril.

# Setup

## Install/update Firebase tools

npm i -g firebase-tools

## Firebase console

https://console.firebase.google.com/

## Init Firebase hosting

firebase init hosting

Select "fb-stack" project
Select public directory "public"
Select "configure as single-page app"

Test run with 
firebase serve --only hosting
Will start local test server on http://localhost:5000

## Init Firebase functions

firebase init functions

Select "Javascript"
Select intsall dependencies "Y"

The directory /functions is created, containing index.js wich is the firebase server nodejs script

If google storage-api will be used:
npm install --save @google-cloud/storage

If trouble with node-pre-gyp:
npm install node-pre-gyp -g

## Test Firebase functions

functions/index.js
```
const functions = require('firebase-functions');
exports.helloWorld = functions.https.onRequest((request, response) => {
response.send("Hello from Firebase!");
});
```

firebase.json
```
{
 "hosting": {
   "public": "public",
   "ignore": [
     "firebase.json",
     "**/.*",
     "**/node_modules/**"
   ],
   "rewrites": [     
     {"source": "/helloWorld", "function": "helloWorld"},
     {"source": "**", "destination": "/index.html"}     
   ]
 }
}
```
### Test locally

firebase serve --only functions,hosting

http://localhost:5000/helloWorld
should display
Hello from Firebase!

### Test remotely

firebase deploy

https://fb-stack.firebaseapp.com/helloWorld
should display
Hello from Firebase!

## Setup express server

cd functions
npm i express --save

## Test express server

functions/index.js
```
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
```

firebase.json
```
{
  "hosting": {
    "public": "public",
    "ignore": [
      "firebase.json",
      "**/.*",
      "**/node_modules/**"
    ],
    "rewrites": [      
      {"source": "/helloWorld", "function": "helloWorld"},
      {"source": "/timestamp", "function": "app"},
      {"source": "**", "destination": "/index.html"}      
    ]
  }
}
```

