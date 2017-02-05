
require('dotenv').config();

const PORT        = process.env.PORT || 3000;
const ENV         = process.env.ENV || "development";
const express     = require("express");
// const app         = express();
const knexConfig  = require("../../knexfile");
const knex        = require("knex")(knexConfig[ENV]);
const dbHelper    = require('./db-helpers')(knex);


let testUser = {
                first_name: 'Pdewdewdatrick',
                last_name: 'Guaydewdewfs',
                username: 'smdewt',
                email: 'an edewmail',
                password: 'a passwodewrd'
               };


let testTask = {

                task_name: 'Do dishes',
                user_id: 3,
                category_id: 4,
                isComplete: false
               };

dbHelper.newDbInput('users', testUser);
dbHelper.newDbInput('tasks', testTask);

dbHelper.editUser(1, {username: '@PGdkjsalkdhalkdjP'});
dbHelper.editUser(2, {username: '@Awesome'});
dbHelper.editUser(3, {username: '@dEWfewP'});


dbHelper.editTask(2, 2, {isComplete: false});
dbHelper.editTask(1, 1, {taskname: 'frefregfre'});
dbHelper.editTask(1, 3, {task_name: 'Get money'}); // dooes not work, should fail
dbHelper.editTask(3, 3, {task_name: 'Get money'});
dbHelper.editTask(2, 2, {isComplete: false});
dbHelper.editTask(3, 5, {task_name: 'Checkout Shawarma Palace', isComplete: true});


dbHelper.showAllTasksFromUser(1);
dbHelper.showAllTasksFromUser(2);

dbHelper.showAllActiveTasksFromUser(2);
dbHelper.showAllActiveTasksFromUser(3);

dbHelper.showAllFromCategory(1, 'Movies');
dbHelper.showAllFromCategory(3, 'Books');
dbHelper.showAllFromCategory(2, 'Books');

change to have an assertion library


app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});
