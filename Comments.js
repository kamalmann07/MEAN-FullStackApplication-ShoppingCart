var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var commentSchema = new Schema({
    name: { type: String, required: true },
    comment: { type: String},
    user: { type: String}
});

module.exports = mongoose.model('userComments', commentSchema);