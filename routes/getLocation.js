'use strict'

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Location = require('../models/location')

//get all locations
router.get('/', function (req, res){ 
    Location.find({}, function(err, locations) {
        if (!err){ 
            res.json(locations)
        } 
        else {
            res.json({
                messageType: "error",
                message: "Could Not find Locations on Database. Check database Connection"
            });
        }
    });
});


module.exports = router;

/*

Cat.findOneAndUpdate({age: 17}, {$set:{name:"Naomi"}}, {new: true}, function(err, doc){
    if(err){
        console.log("Something wrong when updating data!");
    }

    console.log(doc);
});

*/