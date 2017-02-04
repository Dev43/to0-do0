"use strict";
const router  = require('express').Router();
const auth    = require('./lib/authenticate');

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
    db_helper.showAllActiveTasksFromUser(userid)
    .then((response) => {
      res.json(response)
    })
  });

  router.post("/new", (req, res) => {
    let userid = auth(req, res);
    const taskObj = {
      user_id: userid || 3,
      task_name: req.body.task_name || 'taskInactive',
      category_id: req.body.category_id,
      isComplete: req.body.isComplete
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

  router.post("/edit", (req, res) => {
    const taskObj = {
      taskid : req.body.taskid,
      isComplete : req.body.isComplete
    }
    console.log(req.body);
    console.log(taskObj.isComplete);
    // return res.status(200).end();
    return db_helper.editTask(taskObj.taskid, "isComplete", taskObj.isComplete)
    // .then((result)=> {
    //   console.log(result);
    //   return res.status(200).send('Task modified');
    // })
  })

  return router;
}
