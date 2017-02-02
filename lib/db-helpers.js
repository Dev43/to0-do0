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

console.log("i work")





// we are getting knex passed to us
let users = {first_name: 'Patrick',
 last_name: 'Guayfs',
 username: 'smt',
  email: 'an email'
 , password: 'a password'};


let newUser = function(userObject){

  knex('users')
  .insert({first_name: userObject.first_name, last_name: userObject.last_name, username: userObject.username, email: userObject.email, password: userObject.password})
  .then(() => console.log('i did it!'));
}


newUser(users);




app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});
