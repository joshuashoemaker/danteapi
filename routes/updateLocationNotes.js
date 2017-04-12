'use strict'

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Location = require('../models/location');

//get all locations
router.post('/', function (req, res){ 

    let locationName = req.body.name;
    let newNotes = req.body.notes;

    Location.findOneAndUpdate(

        //Find on Condition
        {name:  locationName},

        //Update the Information 
        {$set:{
                notes: newNotes
            }
        },

        //Return the update object
        {new: true},

        //Callback after update is finished
        function(err, loc){
            if(err){
                console.log("Something wrong when updating data!");
                res.json("We did not update the info");
            }
            else{
                console.log(loc);
                res.json("We updated the info");
            }
        });
});


module.exports = router;

