const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const locationSchema = new Schema({
  name:  String,
  address: String,
  summary:   String,
  notes: [
    { 
      body: String, 
      date: Date 
    }
  ],
  meta: {
    dateEntered: { 
      type: Date, 
      default: Date.now 
    }
  }
});

const Location = mongoose.model('Location', locationSchema);
module.exports = Location;