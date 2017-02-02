"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {
  const db_helper = require('./lib/db-helpers.js')(knex);

  router.get("/", (req, res) => {
    knex
      .select("*")
      .from("tasks")
      .then((results) => {
        res.json(results);
    });
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
