var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    name: { type: String, required: true },
    imageLocation: { type: String, required: true },
    price: { type: Number, required: true },
    inventory: { type: Number, required: true },
    rating: { type: Number, required: true },
    itemsSold: { type: Number, required: true }
});

module.exports = mongoose.model('itemDetails', schema);