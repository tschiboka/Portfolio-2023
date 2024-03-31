const mongoose = require('mongoose');

const Log = mongoose.model('Logs', {
    timestamp: String,
    name: String,
    message: String,
    stack: String
});

module.exports.Log = Log;