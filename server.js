// Import the required modules
const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex')

// Import the controllers
const register = require('./controllers/register');
const signin = require('./controllers/signin'); 
const profile = require('./controllers/profile');
const image = require('./controllers/image');

// Initialize the database connection using knex
const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : '*Zmt104*',
    database : 'cyber-brain'
  }
});

// Initialize the express application
const app = express();
// Use the JSON parser middleware
app.use(express.json())
// Use the CORS middleware
app.use(cors())

// Define the root route
app.get('/', (req, res)=> {
  res.send('It is working!');
})

// Define the signin route
app.post('/signin', (req, res) => { signin.handleSignin(req, res, db, bcrypt) })

// Define the register route
app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) })

// Define the profile route
app.get('/profile/:id', (req, res) => { profile.handleProfileGet(req, res, db) })

// Define the image route
app.put('/image', (req, res) => { image.handleImage(req, res, db) })

// Define the imageurl route
app.post('/imageurl', (req, res) => { image.handleApiCall(req, res) })

// Start the server on port 3000
app.listen(3000, ()=> {
  console.log('app is running on port 3000');
})
