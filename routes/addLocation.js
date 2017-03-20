'use strict'

//dependencies
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const urlEncodedParser = bodyParser.urlencoded({extended: false});
const jsonParser = bodyParser.json();

const Location = require('../models/location');


router.post('/', function(req, res){
   new Location ({
      name: req.body.locationName,
      address: req.body.address,
      summary: req.body.summary,
      notes: []
   })
   .save(function (err){
      if (err){
          res.send(responseType("noSave"));
          throw(err);
      }
      else {
          res.send('Successfully inserted!');
      }
   });
});

function responseType (type){
    if(type === "noSave"){
        return {
            messageType: "error",
            message: "Could not save your entry to the database."
        }
    }
    else if("exists"){
        return {
            messageType: "error",
            message: "An entry already exists bt that name."
        }
    }
    else if(type === "saveave"){
        return {
            messageType: "success",
            message: "Your entrywas saved to the database."
        }
    }
}


//Return router
module.exports = router;
