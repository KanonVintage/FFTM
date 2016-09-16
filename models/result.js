var mongoose = require('mongoose');
var User     = require('../models/user');
var Building     = require('../models/building');

// define the schema for user samples
var sampleSchema = new mongoose.Schema({
    _user            : { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    type             : String,
    code             : String,
    date             : String,
    exam             :[{ type: mongoose.Schema.Types.ObjectId, ref: 'Exam' }],
    meta             : Boolean
});

// define the schema for sample exams
var examSchema = new mongoose.Schema({
    _sample          : { type: mongoose.Schema.Types.ObjectId, ref: 'Sample' },
    type             : String,
    parameter        : String,
    units            : String,
    result           : String,
    ref              : String
});

// create the model for users and expose it to our app
module.exports = mongoose.model('Sample', sampleSchema);
// create the model for users and expose it to our app
module.exports = mongoose.model('Exam', examSchema);