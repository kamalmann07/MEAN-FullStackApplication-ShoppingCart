var express = require('express');
var app = express();  

// serve files in static' folder at root URL '/'
app.use('/', express.static('static'));
var mongoose = require('mongoose');
var db = mongoose.connection;
var ItemDetails = require('./data');
var userComments = require('./Comments');
var userDetails = require('./users');
var wishlistDetails = require('./wishlist');
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
    extended: true
}));

const cors = require('cors')

var corsOptions = {
  origin: 'http://localhost:4200',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204 
}

app.use(cors(corsOptions))

app.use(bodyParser.json());
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
mongoose.connect('mongodb://localhost:27017/lab5')



//Get Data from MongoDB
app.get('/Items', function (req, res) {
  var itemDetails = ItemDetails.find(function (err, itemDetails) {
      if (err) {
          res.send(err);
      }
      res.send(itemDetails);
    //   console.log(itemDetails);
  });
})


//Get User Comments from MongoDB
app.get('/getUserComments', function (req, res) {
    var UserComments = userComments.find(function (err, comments) {
        if (err) {
            res.send(err);
        }
        res.send(comments);
      //   console.log(itemDetails);
    });
  })

  //Get User Comments from MongoDB
app.get('/getUserDetails', function (req, res) {
    var UserComments = userDetails.find(function (err, details) {
        if (err) {
            res.send(err);
        }
        res.send(details);
      //   console.log(itemDetails);
    });
  })


    //Get User Comments from MongoDB
app.get('/getWishlistDetails', function (req, res) {
    var UserComments = wishlistDetails.find(function (err, details) {
        if (err) {
            res.send(err);
        }
        res.send(details);
      //   console.log(itemDetails);
    });
  })

//Function to insert rows
app.post('/add', function (req, res) {
   var addImage = new ItemDetails();
   addImage.name = req.body.name;
   addImage.imageLocation = req.body.imageLocation;
   addImage.price = req.body.price;
   addImage.inventory = req.body.inventory;
   addImage.rating = req.body.rating;
   addImage.itemsSold = req.body.itemsSold;

   addImage.save(function (err) {
       if (err) {
           res.send(err);
       }
       res.send({ message: req.body.name + ' Product is Created !' })
   })
});


//Function to insert rows
app.post('/addUserComment', function (req, res) {
    var addComment = new userComments();
    addComment.name = req.body.name;
    addComment.comment = req.body.comment;
    addComment.user = req.body.user;
 
    addComment.save(function (err) {
        if (err) {
            res.send(err);
        }
        res.send({ message: req.body.name + ' User Comment is Created !' })
    })
 });

 //Function to insert rows
app.post('/addWishlistItems', function (req, res) {
    var addWishlist = new wishlistDetails();
    addWishlist.name = req.body.name;
    addWishlist.visibility = req.body.visibility;
    addWishlist.user = req.body.user;
    addWishlist.group = req.body.group;

    addWishlist.save(function (err) {
        if (err) {
            res.send(err);
        }
        res.send({ message: req.body.user + ' wishlist is Created !' })
    })
 });

 //Function to insert rows
app.post('/addUserDetails', function (req, res) {
    var addUserDetails = new userDetails();
    addUserDetails.userName = req.body.userName;
    addUserDetails.isAdmin = req.body.isAdmin;
    addUserDetails.isActive = req.body.isActive;
 
    addUserDetails.save(function (err) {
        if (err) {
            res.send(err);
        }
        res.send({ message: req.body.userName + ' User Details are Created !' })
    })
 });

 // Update items
app.put('/updateRating', function (req, res) {
    var itemtoupdate = req.body.name;
    var rating = req.body.rating;
    var newvalues = { $set: { 'rating': rating } };
    var c = ItemDetails.updateOne({ 'name': itemtoupdate }, newvalues, function (err, c) {
        if (err) {
            res.send(err);
        }
        res.send({ message: itemtoupdate + ' Product Rating has been Updated !' })
    })
  });

   // Update user details
app.put('/updateUserDetails', function (req, res) {
    var itemtoupdate = req.body.userName;
    var isActive = req.body.isActive;
    var isAdmin = req.body.isAdmin;
    var newvalues = { $set: { 'isActive': isActive, 'isAdmin': isAdmin } };
    var c = userDetails.updateOne({ 'userName': itemtoupdate }, newvalues, function (err, c) {
        if (err) {
            res.send(err);
        }
        res.send({ message: itemtoupdate + ' User Details has been Updated ! ' })
    })
  });

// Update items
app.put('/update', function (req, res) {
    var itemtoupdate = req.body.name;
    var price = req.body.price;
    var inventory = req.body.inventory;
    var newvalues = { $set: { 'price': price, 'inventory': inventory } };
    var c = ItemDetails.updateOne({ 'name': itemtoupdate }, newvalues, function (err, c) {
        if (err) {
            res.send(err);
        }
        res.send({ message: itemtoupdate + ' Product has been Updated !' })
    })
  });

  // Update inventory after order confirmation
app.put('/order', function (req, res) {
    var itemtoupdate = req.body.name;
    var inventory = req.body.inventory;
    var itemsSold = req.body.itemsSold;
    var newvalues = { $set: { 'inventory': inventory, 'itemsSold': itemsSold } };
    var c = ItemDetails.updateOne({ 'name': itemtoupdate }, newvalues, function (err, c) {
        if (err) {
            res.send(err);
        }
        res.send({ message: itemtoupdate + ' Product has been Updated after order placing !' })
    })
  });

  //delete rows
app.delete('/delete', function (req, res) {
    var item = req.body.name;
    var c = ItemDetails.deleteOne({ 'name': item }, function (err, c) {
        if (err) {
            res.send(err);
        }
        res.send({ message: item + ' Product Deleted !' })
    })
  });


  //delete rows
app.delete('/deleteFromWishlist', function (req, res) {
    var item = req.body.name;
    var user = req.body.user;
    var c = wishlistDetails.deleteOne({ 'name': item, 'user': user }, function (err, c) {
        if (err) {
            res.send(err);
        }
        res.send({ message: item + ' Deleted from wishlist of user ' + user })
    })
  });

app.listen(8080); // start server

console.log('Listening on port 8080');
