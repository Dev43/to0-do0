"use strict";

const router  = require('express').Router();

function makeUserObject(requestObject){
  return {
      username: requestObject.username || '@PxG',
      first_name: requestObject.first_name || 'pat',
      last_name: requestObject.first_name || 'dnjewd',
      email: requestObject.email || "123@123",
      password: requestObject.password || '1234'
    }
}




module.exports = (knex) => {
  const db_helper = require('./lib/db-helpers.js')(knex);


  router.get('/new_user', (req, res) => {
// crafting the user-object
    const userObj = makeUserObject(req.body)
    console.log(userObj);
     // the first promise gets called to check if the username is in the databse
     db_helper.isUsernameInUsers(userObj.username)
     .then( () => { // the second promise gets called only if there is no username that matches in the db
            db_helper
            .newDbInput('users', userObj)
            .then(() => {return res.send('Successfully Written!')})
            return;
            })
     .catch((err) => {return res.send("Username Exists, please pick another one!" )} // else redirect the user to a page saying it doens't exist
);

  });


  router.get('/register', (req, res) => {
     const userObj = makeUserObject(req.body)
     console.log(userObj);


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

