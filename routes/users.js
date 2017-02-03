"use strict";

const cookieSession = require('cookie-session');
const router  = require('express').Router();
const bcrypt = require('bcrypt');


function makeUserObject(requestObject){

  const hash = bcrypt.hashSync("1234", 10);
  // const hash = bcrypt.hashSync(requestObject.password, 10);


  return {
      username: requestObject.username || '@Pat',
      first_name: requestObject.first_name || 'pdqwat',
      last_name: requestObject.first_name || 'dndqjewd',
      email: requestObject.email || "1dqw23@123",
      password: hash || '12dqw34'
    }
}





module.exports = (knex, app) => {

  const db_helper = require('./lib/db-helpers.js')(knex);
  app.use(cookieSession({ // attaches propety session to req
    name: 'session',
    keys: ['key1', 'key2']
  }));


  router.get('/register', (req, res) => {
    const userObj = makeUserObject(req.body)
    let p1 = db_helper.isUsernameInUsers//(userObj.username);
     // the first promise gets called to check if the username is in the databse
    let p2 = db_helper.newDbInput//('users', userObj);
    let p3 = db_helper.getUserId//(userObj.username);

    p1(userObj.username).then((err) => {
      if(err){
       return res.send('user already in db')
      }
      return  p2('users', userObj).then(() => {
        return p3(userObj.username).then((value) => {
          req.session.user_id = value[0].userid;
          return res.end();

        });
      });
    });

  });

  router.get('/login', (req, res) => {
    // we will get username and password
    const username = req.body.username || "@Pat";
    const password = req.body.password || "1234";

    db_helper.getUser(username).then((user) => {
      if(!user.length){
        console.log("Error, your username is not valid");
        return res.end("Error, your username is not valid");
      }
      if(!bcrypt.compareSync(password, user[0].password)){
        return res.end("wrong password, try again");
      }
       req.session.user_id = user[0].userid;
       res.end(JSON.stringify(user));
    })
  });

  return router;
}
  // router.get("/", (req, res) => {
  //   knex
  //     .select("*")
  //     .from("users")
  //     .then((results) => {
  //       res.json(results);
  //   });
  // }); NOT NEEDED, when does a person want to get all the users from our db?


