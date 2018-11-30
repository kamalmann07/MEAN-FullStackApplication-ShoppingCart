// JavaScript source code
var courseDetails = require('./data');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/lab5')


var courseDetails = [
    new courseDetails({
        name: 'Burger',
        imageLocation: 'https://sallysbakingaddiction.com/wp-content/uploads/2018/07/best-black-bean-burgers-2.jpg',
        price: 5.99,
        inventory: 15,
        rating: 4.4,
        itemsSold: 0
    }),
    new courseDetails({
        name: 'Chicken',
        imageLocation: 'https://www.inspiredtaste.net/wp-content/uploads/2017/10/Roasted-Chicken-with-Lemon-Recipe-1200.jpg',
        price: 10.99,
        inventory: 15,
        rating: 4,
        itemsSold: 0
    }),
    new courseDetails({
        name: 'Pineapple',
        imageLocation: 'https://i5.walmartimages.ca/images/Large/083/646/6000198083646.jpg',
        price: 2.99,
        inventory: 15,
        rating: 3.4,
        itemsSold: 0
    }),
    new courseDetails({
        name: 'Tomato',
        imageLocation: 'https://ripeme.com/wp-content/uploads/RV-10070-RIPE-ORGANIC-ORGANIC-TOMATO-BEEF.jpg',
        price: 1.59,
        inventory: 15,
        rating: 4.9,
        itemsSold: 0
    }),
    new courseDetails({
        name: 'Jacket',
        imageLocation: 'https://www.klim.com/images/5146-003_Gray_01.jpeg?resizeid=2&resizeh=300&resizew=300',
        price: 199.99,
        inventory: 15,
        rating: 4.1,
        itemsSold: 0
    }),
    new courseDetails({
        name: 'Slingbag',
        imageLocation: 'https://dynamic.zacdn.com/8tPR-5ZiDhDMOQxc7UzXDAvRS3M=/fit-in/346x500/filters:quality(95):fill(ffffff)/http://static.my.zalora.net/p/fossil-6502-8284831-1.jpg',
        price: 99.90,
        inventory: 15,
        rating: 3.1,
        itemsSold: 0
    }),
    new courseDetails({
        name: 'Backpack',
        imageLocation: 'https://images-na.ssl-images-amazon.com/images/I/61xJOdweD8L._SX466_.jpg',
        price: 78.90,
        inventory: 15,
        rating: 3.7,
        itemsSold: 0
    }),
    new courseDetails({
        name: 'Facewash',
        imageLocation: 'https://www.dove.com/content/dam/unilever/dove/india/pack_shot/front/skin_care/face/dove_deep_pure_fashwash100ml/Dove_Deep_Pure_Facewash_100ml_8901030349287-308351.png.ulenscale.460x460.png',
        price: 8.99,
        inventory: 15,
        rating: 4.8,
        itemsSold: 0
    }),
    new courseDetails({
        name: 'Perfume',
        imageLocation: 'https://cdn.pji.nu/product/standard/280/2775321.jpg',
        price: 58.99,
        inventory: 15,
        rating: 5.0,
        itemsSold: 0
    }),
    new courseDetails({
        name: 'Soap',
        imageLocation: 'https://images-na.ssl-images-amazon.com/images/I/61KQeHn6W2L._SX466_.jpg',
        price: 4.99,
        inventory: 15,
        rating: 3.0,
        itemsSold: 0
    }),
];

var done = 0;
for (var i = 0; i < courseDetails.length; i++) {
    courseDetails[i].save(function (err, result) {
        done++;
        if (done == courseDetails.length) {
            exit();
        }
    });
}

function exit() {
    mongoose.disconnect();
}