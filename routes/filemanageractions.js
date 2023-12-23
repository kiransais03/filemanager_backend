const express = require('express');
const app = express();
const {s3} = require('../awssdk')
const multer = require('multer');
const multerS3 = require('multer-s3')
const {isAuth} = require('../middlewares/isAuthmiddleware');
const {createMainuserfolder,createsubfolder,deletefolder,uploadfile,deletefile,getfile,copyandpastefile} = require('../functions/fileManagerfunctions');

//Folder functions

app.post('/createmainuserfolder',isAuth,createMainuserfolder);

app.post('/createsubfolder',isAuth,createsubfolder);

app.delete('/deletefolder/:key(*)',isAuth,deletefolder);


//File functions

const upload = multer({
    storage: multerS3({
      s3: s3,
      bucket: 'filemanager-s3bucket',
      key: function (req, file, cb) {
        console.log("Bidybdooudfas",req.body)
        cb(null,`${req.body.awslocationkey}/${Date.now().toString()}_${file.originalname}`)
      },
      metadata: function (req, file, cb) {
        cb(null, {fieldName: file.fieldname});
      },
    })
  })
  
  app.post('/uploadfile',isAuth,upload.single('mainfileupload'),uploadfile);

  app.delete('/deletefile/:key(*)',isAuth,deletefile);

  app.get('/getfile/:key(*)',isAuth,getfile);

  app.post('/copyandpastefile',isAuth,copyandpastefile);

module.exports = app; 
