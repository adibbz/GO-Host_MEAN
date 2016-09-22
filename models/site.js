// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var sitesEntrySchema = new Schema({
    ip: {
      type: String,
      required: true,
      trim: true
    },
    domain: {
      type: String,
      required: true,
      trim: true
    },
    wp: {
      type: String,
      required: true,
      trim: true
    },
    host_name: {
      type: String,
      required: true
    },
    hosted: {
      type: Number,
      min: 0,
      max: 1,
      required: true
    }
});

// make this available to our users in our Node applications
var Site = mongoose.model('Site', sitesEntrySchema);
module.exports = Site;

