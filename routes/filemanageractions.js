const express = require('express');
const app = express();
const {isAuth} = require('../middlewares/isAuthmiddleware');
const {createfolder,createsubfolder,deletefolder} = require('../functions/fileManagerfunctions');


app.post('/createfolder',isAuth,createfolder);

app.post('/createsubfolder',isAuth,createsubfolder);

app.delete('/deletefolder/:key',isAuth,deletefolder);

module.exports = app; 
 