var express = require('express');
var app = express();  

// serve files in static' folder at root URL '/'
app.use('/', express.static('static'));
var mongoose = require('mongoose');
var db = mongoose.connection;
var ItemDetails = require('./data');
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

app.listen(8080); // start server

console.log('Listening on port 8080');
