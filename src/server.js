const express = require('express');

const app = express();

const port = process.env.PORT || 5000;

const mongoose = require('mongoose');

// eslint-disable-next-line no-unused-vars
const Task = require('./services/mongo/models/todoListModel');
// created model loading here

const routes = require('./services/mongo/routes/todoListRoutes'); // importing route

const bodyParser = require('body-parser');

await mongoose
  .connect('mongodb://localhost:27017/TodoDB')
  
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('TEST');
});


routes(app); // register the route

app.listen(port, () => {
  console.log('server started on: ' + port);
});
