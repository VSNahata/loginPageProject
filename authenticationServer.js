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

// const { log } = require("console");
const express = require("express")
const PORT = 3000;
const app = express();
// write your logic here, DONT WRITE app.listen(3000) when you're running tests, the tests will automatically start the server
/*
first i will go for signup, here the user will send his information in json format in body and i will run 
a loop in the file in which i am writing the data of the user if he previously exist,
if yes, then 400 bad request
and if not, i will increase the global counter of uniqueId and write the information in the file and respond with 201
*/

app.use(express.json());

const fs = require('fs');

var dataArray = []
function signUp(req, res){
  let username = req.body.username;
  let password = req.body.password
  let firstName = req.body.firstName
  let lastName = req.body.lastName

  fs.readFileSync(__dirname+'/files/a.txt', 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading the file:', err);
    return;
    }
    let myArray = JSON.parse(data); 
    dataArray = [...dataArray, ...myArray]
})
let temp = {
  "username":username,
  "password":password,
  "firstName":firstName,
  "lastName":lastName
}
let flag = true
if(dataArray.length!==0){
for(let i = 0; i<dataArray.length;i++)
{
  console.log(dataArray[i].username)
  
  if(dataArray[i].username === username)
  {flag = false
  res.status(404).send("this user already exist")}
}
}

if(flag) 
{dataArray.push(temp)
console.log(dataArray)
const arrayData = JSON.stringify(dataArray);
fs.writeFileSync('files\\a.txt', arrayData, (err) => {
  if (err) {
    console.error('Error writing to the file:', err);
  } else {
    console.log('Data has been written to the file successfully.');
  }
});
res.send("this is awesome")}

}

app.post('/signup', signUp)

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})

module.exports = app;
// one problem still persists , when i restart the server it erases and writes new data in text file.
/*
common points of error were =>
1) Make sure that you're not calling response-sending methods 
(like res.send(), res.json(), or res.end()) more than once
 in your route handler or middleware. 
 Once the response is sent, you cannot modify the headers.

 2)file ko likhne ka tareeka dekh lo 
*/