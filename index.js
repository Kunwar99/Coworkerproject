var bodyParser = require('body-parser');
const express = require('express')
const app = express()
var db = require('./db');
const port = 3000

var executeQuery = async function (query) {
    var connectionPool = await db;
    var result = await connectionPool.request().query(query);
    console.log(result);
    return result.recordset;
  }
  //send json formatted record set as a response
  var sendQueryResults = async function (res, query) {
    try {
     var recordset = await executeQuery(query);
     res.json(recordset);
    }
    catch (err) {
        console.log(err);
        res.status(400);
      res.send({
        success: false,
        error: err,
        status:400,
      });
    }
  };

app.get('/', function(req, res) {
    var query = "SELECT * FROM users";
    sendQueryResults(res, query);
    console.log("data from database sent to client")
    //res.send('ok');
});


var urlencodedParser = bodyParser.urlencoded({ extended: false })
app.post('/insert', urlencodedParser, function(req, res) {
    response = {
                 name:req.body.names,
                 phone_number:req.body.phone_numbers,
                 email:req.body.emails,
                 password:req.body.passwords,
                 role:req.body.roles,
             };
    var query = "INSERT INTO users(name,phone_number, email, password, role) values('"+ response.name + " ','" +  response.phone_number +"','"+response.email +" ','" +response.password +"',' "+response.role +"')";
    sendQueryResults(res, query);
    console.log("data from database sent to client")
  });

  app.put('/update/:name', urlencodedParser, function(req, res) {
       response = {
                 name:req.body.names,
                 phone_number:req.body.phone_numbers,
                 email:req.body.emails,
                 password:req.body.passwords,
                 role:req.body.roles,
             };
    var query = "Update [users] SET email = '" + req.body.email + "' where name = '" + req.params.name + "' ";
    sendQueryResults(res, query);
    console.log("data from database sent to client")
  });

  app.delete('/delete/:email', urlencodedParser, function(req, res) {
    var query = "Delete from users where email = '" + req.params.email +"'";
    sendQueryResults(res, query);
    console.log("data from database sent to client")
  });


// app.get('/', function(req, res) {
//     res.send('Hello World!');
// });

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))




