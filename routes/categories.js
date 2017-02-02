"use strict";
// dO we need to get all the categories for a user?
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
