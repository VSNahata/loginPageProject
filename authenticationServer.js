/**
  You need to create a HTTP server in Node.js which will handle the logic of an authentication server.
  - Don't need to use any database to store the data.

  - Save the users and their signup/login data in an array in a variable
  - You can store the passwords in plain text (as is) in the variable for now

  The expected API endpoints are defined below,
  1. POST /signup - User Signup
    Description: Allows users to create an account. This should be stored in an array on the server, and a unique id should be generated for every new user that is added.
    Request Body: JSON object with username, password, firstName and lastName fields.
    Response: 201 Created if successful, or 400 Bad Request if the username already exists.
    Example: POST http://localhost:3000/signup

  2. POST /login - User Login
    Description: Gets user back their details like firstname, lastname and id
    Request Body: JSON object with username and password fields.
    Response: 200 OK with an authentication token in JSON format if successful, or 401 Unauthorized if the credentials are invalid.
    Example: POST http://localhost:3000/login

  3. GET /data - Fetch all user's names and ids from the server (Protected route)
    Description: Gets details of all users like firstname, lastname and id in an array format. Returned object should have a key called users which contains the list of all users with their email/firstname/lastname.
    The users username and password should be fetched from the headers and checked before the array is returned
    Response: 200 OK with the protected data in JSON format if the username and password in headers are valid, or 401 Unauthorized if the username and password are missing or invalid.
    Example: GET http://localhost:3000/data

  - For any other route not defined in the server return 404

  Testing the server - run `npm run test-authenticationServer` command in terminal
 */

const { log } = require("console");
const express = require("express")
const PORT = 3000;
const app = express();
// const uuidv4 = require("uuid/dist/v4.js")

app.use(express.json());
let uniqueId = 1

const fs = require('fs');




function signUp(req, res){
  let temp=JSON.parse(JSON.stringify(req.body));
 let {username, password, firstName, lastName}=temp;
//  temp={id:uuidv4(),...temp}

 let dataArray = [];

  var data=fs.readFileSync(__dirname+'/files/c.JSON', 'utf8') 
   
    let myArray = JSON.parse(data); //c.JSON file data go into myaray
   
    dataArray = [...dataArray, ...myArray]
   
  



for(let i = 0; i<dataArray.length;i++)
{ 
  if(dataArray[i].username === username){
    res.status(404).send("this user already exist")
    uniqueId=0;
  }
}

if(uniqueId)dataArray.push(temp);
    console.log(dataArray);

const arrayData = JSON.stringify(dataArray);
fs.writeFileSync('files\\c.JSON', arrayData, (err) => {
  if (err) {
    console.error('Error writing to the file:', err);
  } else {
    console.log('Data has been written to the file successfully.');
  }
});
dataArray=[];
res.send("this is awesome")
}

// function login(req,res){
//   var enteredData=JSON.parse(JSON.stringify(req.body));
//    let{username,password}=enteredData;

//   let dataArray = [];

//   var data=fs.readFileSync(__dirname+'/files/c.JSON', 'utf8') 
   
//     let myArray = JSON.parse(data); //c.JSON file data go into myaray
   
//     dataArray = [...myArray];

//     for(let i=0; i<dataArray.length; i++)
//     {

//     }

  
// }
app.post('/signup', signUp);

// app.post("/login",login);

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})
//
module.exports = app;

