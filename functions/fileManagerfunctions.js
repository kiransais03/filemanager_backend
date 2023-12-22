const {s3,ListObjectsCommand, PutObjectCommand,DeleteObjectCommand,GetObjectCommand } = require('../awssdk');
const {TRUE,FALSE,ERROR,NOT_EXIST} = require('../constants');
const multer = require('multer');
const multerS3 = require('multer-s3');
const fs = require('fs');
const path = require('path')
const {addfilemetadata,deletefilemetadata} = require('./filemanagerDbfunctions')

//Create main folder function
const createMainuserfolder =async (req,res)=>{ 

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

//Create subfolder function
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

//Delete folder function
const deletefolder = async (req,res)=>{

  const folderaddress = req.params['key'];

  console.log(folderaddress,"address of key")

    let folderkeyarr = folderaddress.split('/');
    let mainFoldernamearr = folderkeyarr[0].split('-');
    let folderauthoremail = mainFoldernamearr[mainFoldernamearr.length-1];
    
    if(folderauthoremail!==req.locals.email)
    {
        res.status(403).send({
            status : 403,
            message : "Unauthorised,Forbidden access.You dont have permission to delete folder in this location"
        })

        return ;
    }

     const command = new DeleteObjectCommand({
        Bucket: "filemanager-s3bucket",
        Key: `${folderaddress}/`,
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

//Deletefile function
const deletefile = async (req,res)=>{

  const fileaddress = req.params['key'];

  console.log(fileaddress,"address of key")

    let filekeyarr = fileaddress.split('/');
    let filename = filekeyarr[filekeyarr.length-1];
    let mainFoldernamearr = filekeyarr[0].split('-');
    let folderauthoremail = mainFoldernamearr[mainFoldernamearr.length-1];
    
    if(folderauthoremail!==req.locals.email)
    {
        res.status(403).send({
            status : 403,
            message : "Unauthorised,Forbidden access.You dont have permission to delete file in this location"
        })

        return ;
    }

     const command = new DeleteObjectCommand({
        Bucket: "filemanager-s3bucket",
        Key: `${fileaddress}`,
      });

      try {
        const response =await s3.send(command);
        console.log(response,"File has been successfully deleted");

        //To delete filematadata from database
    const deletefilemetadataobj =await deletefilemetadata(filename);
    if(deletefilemetadataobj.error)
    {
        res.status(400).send({
            status :400,
            message : "Failed to add matadata to DB",
        })

        return ;
    }
    console.log("Metadata of file added to database")
      }
      catch(error) {
        console.log(error);
        res.status(400).send({
            status : 400,
            message : "DB error:AWS S3 error.Failed at file deletions",
        })
        return ;
      }

      res.status(200).send({
        status :200,
        message : "The file has been deleted successfully"
      })
}

//Upload file function
const uploadfile =async (req,res)=>{

  console.log("Hello file data",req.file);

  const fileaddress = req.body.awslocationkey;

  console.log(fileaddress,"address of key")

    let filekeyarr = fileaddress.split('/');
    let mainFoldernamearr = filekeyarr[0].split('-');
    let folderauthoremail = mainFoldernamearr[mainFoldernamearr.length-1];
    
    if(folderauthoremail!==req.locals.email)
    {
        res.status(403).send({
            status : 403,
            message : "Unauthorised,Forbidden access.You dont have permission to upload file in this location"
        })

        return ;
    }

  try {

    //To add filematadata to database
    const addfilemetadataobj =await addfilemetadata(req.file,folderauthoremail);
    if(addfilemetadataobj.error)
    {
        res.status(400).send({
            status :400,
            message : "Failed to add matadata to DB",
        })

        return ;
    }
    console.log("Metadata of file added to database")
    console.log("Body formdata",req.body.awslocationkey)
    res.status(201).send({
        status:200,
        message:"File uploaded successfully",
    })
    return ;
 }
 catch(error) {
     console.log("Error ",error)
     res.status(400).send({
         status:400,
         message:"Failed to upload the file",
         errobj :error,
     })
     return ;
 }
}

//Get file from AWS S3 function
const getfile = async (req,res)=>{

  const fileaddress = req.params['key'];

  console.log(fileaddress,"address of key")

  const command = new GetObjectCommand({
    Bucket: "filemanager-s3bucket",
    Key: `${fileaddress}`,
  });


  try {
    const response =await s3.send(command);
    const file = await response.Body.transformToByteArray();
    console.log("File has been successfully retrieved");

    let temppath = path.resolve(__dirname,'tempstorage','awsS3fileimage.png'); 

    res.setHeader('Content-Type','image/png');
 
    fs.writeFileSync(temppath,file);

    res.sendFile(temppath,(error)=>{
      fs.unlinkSync(temppath);

      if(error) {
          res.status(400).send({
              status:400,
              message:"Failed to retrieve the file"
          })

          return ;
      }
    })
  }
  catch(error) {
    console.log(error);
    res.status(400).send({
        status : 400,
        message : "DB error:AWS S3 error.Failed at retrieving file",
    })
    return ;
  }

}


module.exports = {createMainuserfolder,createsubfolder,deletefolder,uploadfile,deletefile,getfile};