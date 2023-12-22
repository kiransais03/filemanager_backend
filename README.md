# File Manger Backend :

#### Note : This app is under construction,working on it.Will update as soon as possible

##### Technologies Used : PostgreSQL,Express,Node.js.

#### Dev Tools : VS Code,Github,Render

#### Web App Development Approach :

##### Backend :
--User Signup and Login system has been implemented,by this user can create an account and login with it, jwt token authentication is used to verify user at every API call.

--And to store the User details, PostgreSQL has been used.

--–For creating the tables in PostgreSQL an ORM called Prisma Migrate is used. 

--For uploading files 'Multer" is used and to store files Amazon S3 cloud is used and corresponding meta data of files is stored in PostgresSQL database.

--Implementing all the CRUD operations for creating folders,uploading files,renaming,deleting,getting file.

--The Backend is Built on Express framework with Node.js runtime.

#####  Schema Of PostgreSQL Tables :
###### Table 1. “users” :
  Attributes - 
  email            varchar(255)          unique
  password         varchar(255)  
  name             varchar(255)  
  createdAt        DateTime 


### Steps Required To Run Applications :

#### Backend :

--"npm install"
     For install all the depencies and packages in the "node-modules" folder.

--"npm install --force"
    If any version conflicts use "--force" flag to  install all the depencies and packages in the "node-modules" folder.

--"node index.js"
   To start and run the server.  
   Open http://localhost:8080 to view it in your browser.

### Deployed Links :

#### --Backend : https://filemanager-backend.onrender.com/

### Attaching The Postman API Documentations : Refer Github Repository

