const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const nodemon = require('nodemon');
const port = process.env.PORT || 5000;
const fsPromises = require('fs').promises;
const path = require('path');
const bcrypt = require("bcrypt");
const {handleNewUser} = require('./controllers/registerNew');

app.use(bodyParser.urlencoded({extended:false}))


app.use('/register', handleNewUser)

app.get("/", (req, res)=>{
    res.sendFile(__dirname + '/index.html');
})

app.get('/reg', (req, res)=>{
  res.json({"name": "yohanes"})
})



// app.post("/formGetter", handleNewUser)


app.listen(port, ()=>{
    console.log(`Server is listening on port ${port}`);
})