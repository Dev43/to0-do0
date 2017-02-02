"use strict";

const router  = require('express').Router();





module.exports = (knex) => {
  const db_helper = require('./lib/db-helpers.js')(knex);


  router.get('/new_user', (req, res) => {

// crafting the user-object
    const userObj = {
      username: req.body.username || '@PxG',
      first_name: req.body.first_name || 'pat',
      last_name: req.body.first_name || 'dnjewd',
      email: req.body.email || "123@123",
      password: req.body.password || '1234'
     }

     // the first promise gets called to check if the username is in the databse
     db_helper.isUsernameInUsers('@PxG')
     .then((result) => {return res.send("Username Exists, please pick another one!" )})
     .catch( // new promise
            db_helper
            .newDbInput('users', userObj)
            .then(() => {return res.send('Successfully Written!')}) // the second promise is called when there is an error (saying there is someone in the db)
);

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

