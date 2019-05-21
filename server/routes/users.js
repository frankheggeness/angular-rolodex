const express = require('express');
const router = express.Router();
const knex = require('../database/knex');
// const verify = require('../middleware/verify');
const passport = require('passport');
const User = require('../database/models/User');

router.get('/', (req, res) => {
  // console.log('hi');
  // return res.send('hi');
  new User().fetchAll().then((results) => {
    let resultsObj = results;

    return res.json(resultsObj);
  });
});

router.get('/new', (req, res) => {
  return res.send('/api/users/new smoke test');
});
router.get('/login', (req, res) => {
  return res.send('you logging in cuz');
});

router.get(':id', (req, res) => {
  console.log(req.query.user);
  new User()
    .where({ id: req.query.user })
    .fetchAll()
    .then((results) => {
      let resultsObj = results.toJSON();

      return res.send(resultsObj);
    });
});

router.get('/:id/edit', (req, res) => {
  return res.send('/api/users/:id/edit smoke test');
});

module.exports = router;
