'use strict'

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Location = require('../models/location')

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