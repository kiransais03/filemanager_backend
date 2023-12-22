const express = require('express');
const app = express();
const {usersingup,userlogin} = require('../functions/userAccountfunctions');


app.post('/login',userlogin);

app.post('/signup',usersingup);

module.exports = app;