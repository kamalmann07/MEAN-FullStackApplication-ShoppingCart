var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var wishlistSchema = new Schema({
    name: { type: String, required: true },
    visibility: { type: String},
    user: { type: String},
    group: {type: String}
});

module.exports = mongoose.model('wishlist', wishlistSchema);