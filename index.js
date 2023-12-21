const express = require('express');
const app = express();
require('dotenv').config(); 
const cors = require('cors');
const querying = require('./elephantsql');

app.use(cors({origin:'*'}));
app.use(express.json());


app.get('/',(req,res)=>{
    res.status(200).send({
        status : 200,
        message : "The server is running fine.Take Rest."
    })
})

app.listen(process.env.PORT,()=>{
    console.log("The server is running in port",process.env.PORT)
});
