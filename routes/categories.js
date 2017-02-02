"use strict";
const router  = require('express').Router();


module.exports = (knex) => {

  router.get("/", (req, res) => {
    knex
      .select("*")
      .from("categories")
      .then((results) => {
        res.json(results);
    });
  });

  return router;
}
