'use strict'

//dependencies
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var urlEncodedParser = bodyParser.urlencoded({extended: false});
var jsonParser = bodyParser.json();

var Location = require('../models/location');

router.post('/', function(req, res){
    let location = new Location();
    location.name = req.body.name;
    location.address = req.body.address;
    location.summary = req.body.summary;
    location.notes = [];
    console.log(location);

    saveLocation(location);


    function saveLocation(location){
        location.save(function(err, location){
            if(err) {
                console.log(err);
                let response = responseType('noSave');
                console.log(response);
                res.json(response);
            }
            else{
                console.log('saved');
                let response = responseType('save');
                console.log(response);
                res.json(response);
            }
        });
    }
});



function responseType (type){
    if(type === "noSave"){
        return {
            messageType: "error",
            message: "Could not save your entry to the database."
        }
    }
    else if(type === "save"){
        return {
            messageType: "success",
            message: "Your entry was saved to the database."
        }
    }
}


//Return router
module.exports = router;
