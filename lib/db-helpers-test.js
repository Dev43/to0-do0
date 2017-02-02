
require('dotenv').config();

const PORT        = process.env.PORT || 8080;
const ENV         = process.env.ENV || "development";
const express     = require("express");
const app         = express();
const knexConfig  = require("../knexfile");
const knex        = require("knex")(knexConfig[ENV]);
const dbHelper    = require('./db-helpers')(knex);


let testUser = {
                first_name: 'Pdewdewdatrick',
                last_name: 'Guaydewdewfs',
                username: 'smdewt',
                email: 'an edewmail',
                password: 'a passwodewrd'
               };


dbHelper.newDbInput('users', testUser);





dbHelper.editDbInput('4', 'users', {username: '@PGP'});

dbHelper.editDbInput('3', 'tasks', {isComplete: true});


dbHelper.showAllTasksFromUser(1);
dbHelper.showAllActiveTasksFromUser(2);
dbHelper.showAllActiveTasksFromUser(3);




app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});
