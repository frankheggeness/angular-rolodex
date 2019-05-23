const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const bcrypt = require('bcryptjs');
const LocalStrategy = require('passport-local');
const cookieParser = require('cookie-parser');
const redis = require('connect-redis')(session);
const User = require('./database/models/User');
const Contact = require('./database/models/Contact');
const saltRounds = 12;
// routes
const userRoute = require('./routes/users');
const contactsRoute = require('./routes/contacts');

require('dotenv').config();

const PORT = process.env.EXPRESS_CONTAINER_PORT;

const app = express();
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// passport stuff

// app.use(methodOverride('_method'));
app.use(cookieParser());
app.use(
  session({
    store: new redis({ url: process.env.REDIS_URL }),
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
  }),
);
app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new LocalStrategy(
    // {
    //   usernameField: 'username',
    //   passwordField: 'password',
    // },
    function(username, password, done) {
      return new User({ username: username })
        .fetch()
        .then((user) => {
          console.log(user);

          if (user === null) {
            return done(null, false, { message: 'bad username and password' });
          } else {
            user = user.toJSON();
            bcrypt.compare(password, user.password).then((res) => {
              // happy route: username exists, passsword matches
              if (res) {
                return done(null, user);
              }
              // error route
              else {
                return done(null, false, { message: 'bad username or password' });
              }
            });
          }
        })
        .catch((err) => {
          console.log('error', err);
          return done(err);
        });
    },
  ),
);

passport.serializeUser(function(user, done) {
  console.log('serializing');
  return done(null, { id: user.id, username: user.username });
});

passport.deserializeUser(function(user, done) {
  console.log('deserial');
  console.log(user);

  return new User({ id: user.id }).fetch().then((user) => {
    user = user.toJSON();
    done(null, {
      id: user.id,
      username: user.username,
    });
  });
});

app.get('/api/profile', (req, res) => {
  console.log(req.query.user);
  new User()
    .where({ id: req.query.user })
    .fetchAll()
    .then((results) => {
      let resultsObj = results.toJSON();

      return res.send(resultsObj);
    });
});
app.get('/api/search/:term', (req, res) => {
  // let user_id = req.query.user;
  let user_id = 1;
  let searchTerm = req.params.term;

  console.log('#%@#@% searching');

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

app.get('/api/users', (req, res) => {
  console.log(req.query.user);
  new User()
    .where({ id: req.query.user })
    .fetchAll()
    .then((results) => {
      let resultsObj = results.toJSON();

      return res.send(resultsObj);
    });
});

// app.post('/api/login', (req, res) => {
//   let body = req.body;
//   new User()
//     .where({ id: req.query.user })
//     .fetchAll()
//     .then((results) => {
//       let resultsObj = results.toJSON();

//       return res.send(resultsObj);
//     });

// });

app.post('/api/login', passport.authenticate('local'), function(req, res) {
  // If this function gets called, authentication was successful.
  // `req.user` contains the authenticated user.
  console.log('@#$@#@#%#%', req);
  let user = req.user;
  res.json(user);
  // res.send(true);
});

app.use('/api/users', userRoute);
app.use('/api/contacts', contactsRoute);

const server = app.listen(PORT, () => {
  console.log(`Express app is running at port ${PORT}`);
});
