"use strict";

const cookieSession = require('cookie-session');
const router  = require('express').Router();


function makeUserObject(requestObject){


  return {
      username: requestObject.username || '@PxGwdqwd',
      first_name: requestObject.first_name || 'pdqwat',
      last_name: requestObject.first_name || 'dndqjewd',
      email: requestObject.email || "1dqw23@123",
      password: requestObject.password || '12dqw34'
    }
}



module.exports = (knex, app) => {

  function insertIntoDb(userObj, res){
    db_helper
    .newDbInput('users', userObj)
    .then(() => {return res.send('Successfully Written!')})
    return;
  }



  function giveCookie(){

  }


  app.use(cookieSession({
    name: 'session',
    keys: ['key1', 'key2']
  }));
  const db_helper = require('./lib/db-helpers.js')(knex);



  // router.get('/register', (req, res) => {
  //    const userObj = makeUserObject(req.body)
  //    console.log(userObj);
  //    // render the register view!
  // });



  router.get('/register', (req, res) => {
// crafting the user-object
    const userObj = makeUserObject(req.body)
     // the first promise gets called to check if the username is in the databse
     db_helper
     .isUsernameInUsers(userObj.username)
     .then( insertIntoDb(userObj, res))
     .catch((err) => {return res.send("Username Exists, please pick another one!" )}) // else redirect the user to a page saying it doens't exist
     .then(() => {db_helper.getUserId(userObj.username)});


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


