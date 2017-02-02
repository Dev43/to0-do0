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
let testUser = {first_name: 'Pdewdewdatrick',
 last_name: 'Guaydewdewfs',
 username: 'smdewt',
  email: 'an edewmail'
 , password: 'a passwodewrd'};

let newDbInput = function(tableName, rowToInsert ){ // made it so it can be a new user OR a new task
  knex(tableName)
  .insert(rowToInsert)
  .then(() => console.log('i did it!'));
}


newDbInput('users', testUser);


let editDbInput = function(userid, tableName, updateObject){ // same thing here, we need to craft a good object on the server-side
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

// delete input (like user) might have to be done with a cascade. Also, why would we want them to be able to delete?
// update will be able to modify what is needed
// delet

let showAllTasksFromUser = function(userid){ // show all tasks from beginning
  knex('tasks')
  .where(`user_id`, userid)
  .then((results) => {
    console.log(results);
    return results;})
}

let showAllActiveTasksFromUser = function(userid){
  knex('tasks')
  .where(`user_id`, userid)
  .andWhere('isComplete', true)
  .then((results) => {
    console.log(results);
    return results;})
}

showAllTasksFromUser(1);
showAllActiveTasksFromUser(2);
showAllActiveTasksFromUser(3);



app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});
