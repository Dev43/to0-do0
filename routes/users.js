"use strict";

const router  = require('express').Router();





module.exports = (knex) => {
  const db_helper = require('./lib/db-helpers.js')(knex);


  router.get('/new_user', (req, res) => {
    // we will need to see if the new user is already in the db, so if the username matches someone else
    const userObj = {
      username: req.body.username || 1,
      first_name: req.body.first_name || 'pat',
      last_name: req.body.first_name || 'dnjewd',
      email: req.body.email || "123@123",
      password: req.body.password || '1234'
     }

     db_helper.isUsernameInUsers('@PxG')
     .then((result) => {res.send("Username Exists, please pick another one!" )})
     .catch((error) => {console.log('it is in!'); res.send('il nexiste pas')});
    // .db_helper
    // .newDbInput('users', userObj)
    // .then(res.send('Successfully Written!'))

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

