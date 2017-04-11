'use strict'

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Location = require('../models/location');

//get all locations
router.post('/', function (req, res){ 

    let locationName = req.body.name;

        Location.findOneAndRemove({name: locationName}, function(err, doc, result){
            if(err){
                console.log(err);
                res.json("There was a problem deleting the entry.");
            }
            else{
                console.log("Deleted Location");
                res.json("The entry was deleted.");
            }
        });
});


module.exports = router;