const fs = require('fs');
const express = require('express')
const app = express();
const path = require('path')
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname)));
const PORT = process.env.PORT || 3000; 
app.listen(PORT, () => console.log(`Using port ${PORT}`));

app.get("/", (request, response) => {
  response.sendFile(__dirname + "/index.html");
});

app.post("/signupnode", (request, response) => {
  fs.readFile('accounts.json', function (err, data){
    let accounts = JSON.parse(data);
    accounts.push(request.body);
    fs.writeFileSync('accounts.json', JSON.stringify(accounts));
    response.sendFile(__dirname + "/index.html");
  })
});

app.post("/signin", (request, response) => {
  fs.readFile('accounts.json', function (err, data){
    let accounts = JSON.parse(data);
    for(i = 0; i<accounts.length; i++){
      if(request.body.email == accounts[i].email & request.body.password == accounts[i].password ){
        let correct = accounts[i];
        fs.writeFileSync('accountuse.json', JSON.stringify(correct));
        response.sendFile(__dirname + "/index.html");
      }
    }
    response.sendFile(__dirname + "/login.html");
  })
});

app.post("/signout", (request, response) => {
  fs.readFile('accountuse.json', function (err, data){
    fs.writeFileSync('accountuse.json', "{}");
    response.sendFile(__dirname + "/index.html");
  })
});

app.post("/p", (request, response) => {
  fs.readFile('p.json', function (err, data){
    let accounts = JSON.parse(data);
    accounts.push(request.body);
    fs.writeFileSync('p.json', JSON.stringify(accounts));
    response.sendFile(__dirname + "/addP.html");
  })
});

app.post("/ep", (request, response) => {
  fs.readFile('p.json', function (err, data){
    let properties = JSON.parse(data);
    for(i=0; i<properties.length; i++){
      if(properties[i].pid == request.body.pid){
        properties[i] = request.body;
      }
    }
    fs.writeFileSync('p.json', JSON.stringify(properties));
    response.sendFile(__dirname + "/myP.html");
  })
});

app.post("/w", (request, response) => {
  fs.readFile('w.json', function (err, data){
    let accounts = JSON.parse(data);
    accounts.push(request.body);
    fs.writeFileSync('w.json', JSON.stringify(accounts));
    response.sendFile(__dirname + "/addW.html");
  })
});

app.post("/ew", (request, response) => {
  console.log("hi")
  fs.readFile('w.json', function (err, data){
    let workspaces = JSON.parse(data);
    for(i=0; i<workspaces.length; i++){
      console.log(workspaces[i].wid )
      console.log(request.body.wid)
      if(workspaces[i].wid == request.body.wid){
        workspaces[i] = request.body;
      }
    }
    fs.writeFileSync('w.json', JSON.stringify(workspaces));
    response.sendFile(__dirname + "/myP.html");
  })
});