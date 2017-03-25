'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var locationSchema = new Schema({
  name:  String,
  address: String,
  summary:   String,
  notes: [
    { 
      body: String, 
      date: Date 
    }
  ]
});

module.exports = mongoose.model('Location', locationSchema);