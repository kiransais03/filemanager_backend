const express = require('express');
const app = express();
require('dotenv').config(); 
const cors = require('cors');
const querying = require('./elephantsql');
const useractions = require('./routes/useractions');
const filemanageractions = require('./routes/filemanageractions');
require('./awssdk');

app.use(cors({origin:'*'}));
app.use(express.json());

app.use('/user',useractions);

app.use('/filemanager',filemanageractions);


app.get('/',(req,res)=>{
    res.status(200).send({
        status : 200,
        message : "This backend is under construction,working on it.Will update as soon as possible"
    })
})

app.listen(process.env.PORT,()=>{
    console.log("The server is running in port",process.env.PORT)
});
