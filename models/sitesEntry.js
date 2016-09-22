
// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var sitesSchema = new Schema({
    sites: [
        {
        ip: String,
        domain: String,
        wp: String,
        host_name: String,
        hosted: String
        }
    ]
});

// make this available to our users in our Node applications
module.exports = mongoose.model('sites', sitesSchema);
