"use strict";
const router  = require('express').Router();

module.exports = (knex) => {
  const db_helper = require('./lib/db-helpers.js')(knex);

  router.get("/", (req, res) => {
    let userid = req.body.user_id || 1;
    db_helper.showAllTasksFromUser(userid).then((response) => {res.json(response)});

  });


  router.get("/active", (req, res) => {
    let userid = req.body.user_id || 1;
    db_helper.showAllActiveTasksFromUser(userid).then((response) => {res.json(response)});
  });

  router.post("/", (req, res) => {
    const taskObj = {
      task_name: req.body.task_name,
      user_id: 1,
      category_id: 1,
      isComplete: true
    };
    db_helper.newDbInput('tasks', taskObj);
    console.log('post to db_helper');
    res.status(200).send()

  });

  return router;
}
