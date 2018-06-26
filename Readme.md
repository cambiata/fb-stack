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
Select insall dependencies "Y"