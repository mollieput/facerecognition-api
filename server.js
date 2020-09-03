const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signIn = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'mollieputnam',
      password : '',
      database : 'facerecognition'
    }
  });

db.select('*').from('users').then(data => {
    console.log(data);
});

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
    res.json(database.users);
})

app.post('/signin', (req,res) => { signIn.handleSignIn(req, res, db, bcrypt) });
app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) });
app.get('/profile/:id', (req, res) => { profile.handleProfileGet(req, res, db) });
app.put('/image', (req, res) => { image.handleImage(req, res, db) });
app.post('/imageurl', (req, res) => { image.handleApiCall(req, res) });

bcrypt.hash("bacon", null, null, function(err, hash) {
    // Store hash in your password DB.
});

// Load hash from your password DB.
bcrypt.compare("bacon", null, function(err, res) {
    // res == true
});
bcrypt.compare("veggies", null, function(err, res) {
    // res = false
});

const PORT = process.env.PORT;

app.listen(PORT, ()=> {
    console.log('app running on port ${PORT}');
});