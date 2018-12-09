/*
 * Express Example
 */

// Dependencies
const express = require('express');
const app = express();
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const hello =  require('./hello');
const usersRoutes = require('./routes/user');
const postsRoutes = require('./routes/posts');
const mongoose = require('mongoose');

//  Starting MongoDB connection
mongoose.connect('mongodb://duha:d12341234@ds115131.mlab.com:15131/mongotestduha',{ useNewUrlParser: true });//admin :admin1234

//  To Check if the connection works fine or not
mongoose.connection.on('connected', () => {
  console.log('\x1b[36m%s\x1b[40m', 'mongo has been connected...');
});


// MiddleWare
app.use(express.json());
// Custom MiddleWare thats do nothing just to made the MiddleWare clear
app.use(hello);
// For serving images and other static data
app.use(express.static('public'));
// Custom MiddleWare
/*app.use((req, res, next) => {
  try {
    let payload = jwt.verify(req.body.token, 'secret123');
    res.send(payload);
  } catch (err) {
    res.status(400).send('invalid token');
  }
  res.send(v);
  next();
});*/

// Route MiddleWare
app.use('/api/user', usersRoutes);
app.use('/api/post', postsRoutes);
// Home Router
app.get('/', (req, res) => {
  const token = jwt.sign({"name":"Hamdon", "age": 24}, 'key');
  res.send(token);
})

// Starting the server
app.listen(3000, () => {
  console.log('Running on port 3000');
});
