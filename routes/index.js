var express = require('express');
var router = express.Router();
const { MongoClient } = require('mongodb');
const bodyParser = require('body-parser');

/* GET home page. */
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/submit', function (req, res) {
  console.log('Received data:', req.body);
  MongoClient.connect('mongodb://127.0.0.1:27017', function (err, client) {
      if (err) {
          console.error('Database connection error:', err);
          return res.status(500).send('Database connection error');
      }
      console.log('Database connected successfully');

      const db = client.db('persondata');
      const collection = db.collection('users');

      collection.insertOne(req.body, function (err, result) {
          if (err) {
              console.error('Data insertion error:', err);
              return res.status(500).send('Data Not Inserted');
          } else {
              console.log('Data Inserted Successfully:', result);
              res.send('Data inserted successfully!');
          }
          client.close();
      });
  });
});


module.exports = router;
