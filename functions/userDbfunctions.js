const {TRUE,FALSE,ERROR,NOT_EXIST} = require('../constants');
const {querying} = require('../elephantsql');

//Saving userObject to database
const addUsertoDB = async (userObj)=>{
   try {
    let querycmd = 'INSERT INTO users VALUES($1,$2,$3)';
     let result = await querying(querycmd,[userObj.email,userObj.password,userObj.name]);
     return TRUE;
   }
   catch(error) {
    return ERROR;
   }
}

//Finding userData from db
const getUserdata = async (email)=>{
    const userData = {
        data : null,
        error : null,
    }

    let querycmd = 'SELECT * FROM users WHERE email=$1';

    try {
        userData.data = await querying(querycmd,[email]);

        console.log(userData,"this is userObj from DB");

        return userData;
    }
    catch(error) {
        console.log("Error catched")
        userData.error = error;
        return userData;
    }
}

//To check if user already exists
const findUseralreadyexists = async (email)=>{
    const userData = {
        data : null,
        error : null,
    }

    try {
   const verifyAccount =await getUserdata(email);

   console.log("Verification obj",verifyAccount);

   if(verifyAccount.data.length===0) {
    console.log("false")
    return FALSE;
   }
   else if(verifyAccount.data[0].email) {
      return "TRUE";
   }
   
}
catch (error) {
   userData.error = error;
   return "ERROR";
 }
}


module.exports = {addUsertoDB,getUserdata,findUseralreadyexists};