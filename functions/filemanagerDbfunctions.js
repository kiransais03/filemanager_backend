const {TRUE,FALSE,ERROR,NOT_EXIST} = require('../constants');
const {querying} = require('../elephantsql');

//Add uploading-file metatdata to Db
const addfilemetadata = async (filedata,email)=>{
    const userData = {
        data : null,
        error : null,
    }
    let querycmd = 'INSERT INTO filesmetadata (filename,size,owner) VALUES($1,$2,$3)';

    try {

        let filenamearr = filedata.key.split('/');
        let filename = filenamearr[filenamearr.length-1];
        userData.data = await querying(querycmd,[filename,filedata.size,email]);
        // console.log(userData,"this is userObj from DB");
        return userData;
    }
    catch(error) {
        console.log("Error catched",error)
        userData.error = error;
        return userData;
    }
}


//Add delete file metatdata from Db
const deletefilemetadata = async (filename)=>{
    const userData = {
        data : null,
        error : null,
    }
    let querycmd = 'DELETE FROM filesmetadata WHERE filename=$1';

    try {
        userData.data = await querying(querycmd,[filename]);
        // console.log(userData,"this is userObj from DB");
        return userData;
    }
    catch(error) {
        console.log("Error catched",error)
        userData.error = error;
        return userData;
    }
}


module.exports = {addfilemetadata,deletefilemetadata}