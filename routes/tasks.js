"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {

  router.get("/", (req, res) => {
    knex
      .select("*")
      .from("tasks")
      .then((results) => {
        res.json(results);
    });
  });

  router.post("/", (req, res) => {
    knex('tasks')
      .insert({task_name: req.body.task_name})
      .then((success)=>{
        success = 1;
        return success;
      })
  });

  return router;
}
