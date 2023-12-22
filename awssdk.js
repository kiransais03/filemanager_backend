const { S3Client,ListObjectsCommand, PutObjectCommand,DeleteObjectCommand,GetObjectCommand} = require('@aws-sdk/client-s3');

// Create an S3 client
const s3 = new S3Client({
  region: 'eu-north-1',
  credentials: {
    accessKeyId: 'AKIAYO2EHKO3XDYWVJTK',
    secretAccessKey: process.env.AWS_SECRET_ACCESSKEY,
  },
});


// // Example: List all objects in a bucket
// const listObjectsParams = {
//     Bucket: 'filemanager-s3bucket',
//   };
  
//   s3.send(new ListObjectsCommand(listObjectsParams))
//     .then((data) => {
//       console.log('Objects in the bucket:', data.Contents);
//     })
//     .catch((err) => {
//       console.error('Error listing objects:', err);
//     }); 

module.exports = {s3,ListObjectsCommand, PutObjectCommand,DeleteObjectCommand,GetObjectCommand}
