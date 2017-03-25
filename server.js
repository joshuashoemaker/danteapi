'use strict'

//dependencies
const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

//environment
mongoose.connect('mongodb://localhost/danteapi');
app.set('view engine','ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const port = process.env.PORT || 3000;


//routes
const addLocation = require('./routes/addLocation');
const getLocation = require('./routes/getLocation');

app.get('/', (req, res) =>{
    res.render('pages/index');
});

app.use('/addLocation', addLocation);
app.use('/getLocation', getLocation);

mongoose.connection.on('connected', function () {  
  console.log('Mongoose default connection opened');
}); 

mongoose.connection.on('error', function (err) {
    throw err;
  console.log("Could not connect to MongoDB");
});


app.listen(port, () =>{
    console.log("Open on port " + port);
});