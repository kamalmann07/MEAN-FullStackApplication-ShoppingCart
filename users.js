var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userDetailSchema = new Schema({
    userName: { type: String, required: true },
    isAdmin: { type: String},
    isActive: { type: String}
});

module.exports = mongoose.model('userDetail', userDetailSchema);