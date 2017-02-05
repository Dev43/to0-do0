"use strict";
const router  = require('express').Router();
const auth    = require('./lib/authenticate');
const categorizer = require('./lib/categorizer');

module.exports = (knex) => {
  const db_helper = require('./lib/db-helpers.js')(knex);

  router.get("/", (req, res) => {
    let userid = auth(req, res);
    db_helper.showAllTasksFromUser(userid)
    .then((response) => {return res.json(response)});
  });

  router.get("/active", (req, res) => {
    let userid = auth(req, res);
    console.log(userid);
    db_helper.showAllActiveTasksFromUser(userid).then((response) => {res.json(response)});
  });

  router.post("/new", (req, res) => {
    if(!req.body.task_name){
      return res.status(500).end("You cannot send an empty task")
    }
    let userid = auth(req, res);
    const taskObj = {
      user_id: userid,
      task_name: req.body.task_name,
      category_id: categorizer(req.body.task_name),
      isComplete: req.body.isComplete || false
    };

    db_helper.getTaskFromUser(taskObj.task_name, taskObj.user_id, taskObj.isComplete)
    .then((result) => {
      console.log(result);
      if(result.length > 0){
        return res.status(401).send("Task already in the list and active")
      }
      return db_helper.newDbInput('tasks', taskObj).then(() => {
        return res.status(200).send("Posted to Db")
      });
    })

  });

  return router;
}
