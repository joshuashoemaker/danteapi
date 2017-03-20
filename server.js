'use strict'

//dependencies
const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

//environment
mongoose.connect('mongodb://<admin>:<ThereIsOnly1>@ds135700.mlab.com:35700/danteapi');
app.set('view engine','ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const port = process.env.PORT || 3000;


//routes
const addLocation = require('./routes/addLocation');

app.get('/', (req, res) =>{
    res.render('pages/index');
});

app.use('/addEntry', addLocation);



mongoose.connection.on('error', function (err) {
  console.log("Connected to remote MongoDB");
});

app.listen(port, () =>{
    console.log("Open on port " + port);
});