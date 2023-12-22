const { s3,ListObjectsCommand, PutObjectCommand,DeleteObjectCommand } = require('../awssdk');
const {TRUE,FALSE,ERROR,NOT_EXIST} = require('../constants');


const createfolder =async (req,res)=>{

    const foldername = req.body.foldername;

    // console.log("This is locals object",req.locals)

   const command = new PutObjectCommand({
    Bucket: "filemanager-s3bucket",
    Key: `${foldername}-${req.locals.email}/`,
  });

  try {
    const response =await s3.send(command);
    console.log(response,"Folder has been successfully created");
  }
  catch(error) {
    console.log(error);
    res.status(400).send({
        status : 400,
        message : "DB error:AWS S3 error.Failed at folder creation",
    })
    return ;
  }

  res.status(201).send({
    status :201,
    message : "The Main folder has been created"
  })
}

const createsubfolder =async (req,res)=>{

    const folderkey = req.body.folderkey;

    let folderkeyarr = folderkey.split('/');
    let mainFoldernamearr = folderkeyarr[0].split('-');
    let folderauthoremail = mainFoldernamearr[mainFoldernamearr.length-1];
    
    if(folderauthoremail!==req.locals.email)
    {
        res.status(403).send({
            status : 403,
            message : "Unauthorised,Forbidden access.You dont have permission to create subfolder in this location"
        })

        return ;
    }

   const command = new PutObjectCommand({
    Bucket: "filemanager-s3bucket",
    Key: `${folderkey}/`,
  });

  try {
    const response =await s3.send(command);
    console.log(response,"Subfolder has been successfully created");
  }
  catch(error) {
    console.log(error);
    res.status(400).send({
        status : 400,
        message : "DB error:AWS S3 error.Failed at subfolder creation",
    })
    return ;
  }

  res.status(201).send({
    status :201,
    message : "The Subfolder has been created"
  })
}

const deletefolder = async (req,res)=>{

  const folderaddress = req.params['key'];

  console.log(folderaddress,"address of key")

     const command = new DeleteObjectCommand({
        Bucket: "filemanager-s3bucket",
        Key: folderaddress,
      });

      try {
        const response =await s3.send(command);
        console.log(response,"Folder has been successfully deleted");
      }
      catch(error) {
        console.log(error);
        res.status(400).send({
            status : 400,
            message : "DB error:AWS S3 error.Failed at folder deletions",
        })
        return ;
      }

      res.status(200).send({
        status :200,
        message : "The folder has been deleted successfully"
      })
}

module.exports = {createfolder,createsubfolder,deletefolder};