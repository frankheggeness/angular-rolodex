const express = require('express');
const router = express.Router();
const knex = require('../database/knex');
// const verify = require('../middleware/verify');
const passport = require('passport');
const User = require('../database/models/User');
const Contact = require('../database/models/Contact');

// GET CONTACTS FOR USER

router.get('/', (req, res) => {
  console.log(req.query.user);
  new Contact()
    .where({ created_by: req.query.user })
    .fetchAll({ withRelated: ['users'] })
    .then((results) => {
      let resultsObj = results.toJSON();

      return res.send(resultsObj);
    });
});

// SEARCH

router.get('/search/:term', (req, res) => {
  let user_id = req.query.user;
  let searchTerm = req.params.term;

  Contact.query(function(qb) {
    qb.where({ created_by: user_id }).andWhere(function() {
      this.whereRaw('LOWER(name) LIKE ?', '%' + searchTerm.toLowerCase() + '%');
    });
  })
    .fetchAll()
    .then((contacts) => {
      return res.json({ contacts });
    });
});

// POST NEW CONTACT

router.post('/', (req, res) => {
  console.log('$%$@##$^#@^ youve reached the post');
  new Contact({
    name: req.body.name,
    email: req.body.email,
    address: req.body.address,
    phone: req.body.phone,
    github: req.body.github,
    created_by: req.body.created_by,
  })
    .save()
    .then((result) => {
      return res.json(result);
    });
});

// GET CONTACT WITH ID

router.get('/:id', (req, res) => {
  console.log(req.params.id);
  new Contact()
    .where({ id: req.params.id })
    .fetch()
    .then((results) => {
      let resultsObj = results.toJSON();

      return res.send(resultsObj);
    });
});

// DELETE

router.delete('/:id', (req, res) => {
  console.log(req.params.id);
  new Contact({
    id: req.params.id,
  })
    .destroy()
    .then(() => {
      return res.send('card deleted');
    });
});

module.exports = router;
