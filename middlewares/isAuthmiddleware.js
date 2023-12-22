const jsonwebtoken = require('jsonwebtoken');

const isAuth = async (req,res,next)=>{
    const tokenstring = req.headers['token-filemanager'];
    const token = tokenstring.split(' ')[1];

    let verifiedobj;

    try {
        console.log("token array",token)
            verifiedobj = jsonwebtoken.verify(token,process.env.JWT_SECRETKEY);
    }
    catch(error) {
        res.status(400).send({
            status : 400,
            message : "User not logged in or session expired.Please Login again"
        })

        return ;
    }
    
    if(verifiedobj) {
        console.log("Verified object",verifiedobj);
        console.log(jsonwebtoken.decode(token),"edcoeding");
    req.locals = verifiedobj; //Adding the payload object to req.locals to use in other functions
    next();
    }
    else{
        res.status(401).send({
            status : 401,
            message : "User not loggedIn,Please login",
        })

        return ;
    }
}

module.exports = {isAuth};