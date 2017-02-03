"use strict";

const cookieSession = require('cookie-session');
const router        = require('express').Router();
const bcrypt        = require('bcrypt');
const auth          = require('./lib/authenticate');



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


  router.get('/', (req, res) => {
    if(!req.session.user_id){
      return res.status(201).send("{}")
    }
    const userid = req.session.user_id;
    db_helper.getUser('userid', userid)
    .then((user) => {
      return res.status(200).send(
        JSON.stringify({
          userid: user[0].userid,
          first_name: user[0].first_name,
          username: user[0].username,
          last_name: user[0].last_name
        })
      );
    })
    .catch((err) => {res.status(500).send("Problem with the Database")})

  })

  router.get('/register', (req, res) => {
    const userObj = makeUserObject(req.body)
    let p1 = db_helper.isUsernameInUsers//(userObj.username);
     // the first promise gets called to check if the username is in the databse
    let p2 = db_helper.newDbInput//('users', userObj);
    let p3 = db_helper.getUserId//(userObj.username);

    p1(userObj.username)
      .then((err) => {
        if(err){
         return res.status(400).send('user already in db')
        }
        return  p2('users', userObj)
          .then(() => {
          return p3(userObj.username)
            .then((value) => {
              req.session.user_id = value[0].userid;
              return res.status(201).end("User created");
            });
          });
      });
  });

  router.get('/login', (req, res) => {
    // we will get username and password
    const username = req.body.username || "@Pat";
    const password = req.body.password || "1234";

    db_helper.getUser('username', username).then((user) => {
      if(!user.length){
        console.log("Error, your username is not valid");
        return res.status(400).end("Error, your username is not valid");
      }
      if(!bcrypt.compareSync(password, user[0].password)){
        return res.status(401).end("wrong password, try again");
      }
       req.session.user_id = user[0].userid;
       res.send(
         JSON.stringify({
           userid: user[0].userid,
           first_name: user[0].first_name,
           username: user[0].username,
           last_name: user[0].last_name
        })
      );
    })
  });

  router.get('/logout', (req, res) => {
    req.session = null;
    res.status(200).end("Successfully Logged Out!")
    return;
  });

  return router;
}
