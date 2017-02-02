require('dotenv').config();

const PORT        = process.env.PORT || 8080;
const ENV         = process.env.ENV || "development";
const express     = require("express");
const app         = express();
const knexConfig  = require("../knexfile");
const knex        = require("knex")(knexConfig[ENV]);
const morgan      = require('morgan');
const knexLogger  = require('knex-logger');

app.use(knexLogger(knex));


// we are getting knex passed to us
let testUser = {first_name: 'Patrick',
 last_name: 'Guayfs',
 username: 'smt',
  email: 'an email'
 , password: 'a password'};

let newDbInput = function(tableName, rowToInsert ){ // we can make this WAY more modular
  knex(tableName)
  .insert({first_name: rowToInsert.first_name, last_name: rowToInsert.last_name, username: rowToInsert.username, email: rowToInsert.email, password: rowToInsert.password})
  .then(() => console.log('i did it!'));
}


newDbInput('users', testUser);


let editDbInput = function(userid, tableName, updateObject){
  let userKey = 'user_id';
  if(tableName === 'users'){
    userKey = 'userid';
  }

  knex(tableName)
  .where(`${userKey}`, userid)
  .update(updateObject)
  .then(() => console.log('i did it!'));
}


editDbInput('4', 'users', {username: '@PGP'});

editDbInput('3', 'tasks', {isComplete: true});








app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});
