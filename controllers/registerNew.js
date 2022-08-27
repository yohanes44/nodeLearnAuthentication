const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const fsPromises = require('fs').promises;
const path = require('path');
const bcrypt = require("bcrypt");

app.use(bodyParser.urlencoded({extended:false}))





const usersDB = {
    users: require("../users.json"),
    setUsers: function(data){
        this.users = data;
    }
}


async function handleNewUser(req, res){
    const {user, pass} = req.body;

    const duplicate = usersDB.users.find(us =>
         us.username === user
    )

      console.log(usersDB.users);
      console.log(duplicate);


    if(duplicate){
        res.send("Duplicate Error")
        return;
    }
    else{

      try{
        const hashedPwd = await bcrypt.hash(pass, 10);

        const newUser = {"username": user, "pass": hashedPwd}
        usersDB.setUsers([...usersDB.users, newUser]);

        await fsPromises.writeFile(
            path.join('users.json'),
            JSON.stringify(usersDB.users)
        );

        // res.json(`new user ${user} created`);
        res.status(200).json({"users": usersDB.users});
      }

      catch(err){
        console.log(err);
      }
     
    }
}


module.exports = {handleNewUser};