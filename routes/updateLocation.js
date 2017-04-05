'use strict'

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Location = require('../models/location');

//get all locations
router.post('/', function (req, res){ 

    let locationName = req.body.oldName;

    let newLocation = {
        name: req.body.name,
        summary: req.body.summary,
        address: req.body.address
    };

    Location.findOneAndUpdate(

        //Find on Condition
        {name: locationName},

        //Update the Information 
        {$set:{
                name: newLocation.name,
                summary: newLocation.summary,
                address: newLocation.address
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
            console.log(loc);
            res.json("We updated the info");
        });
});


module.exports = router;