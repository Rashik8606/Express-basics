var express = require('express');
var router = express.Router();
const { MongoClient } = require('mongodb');


/* GET home page. */


router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/submit',function(req,res){
  MongoClient.connect('mongodb://localhost:27017',{serverSelectionTimeoutMS:5000},function(err,client){
    if(err){
      console.log('Data not inserted ...')
      return res.status(500).send('Database connection error')
    }
    console.log(req.body);
    client.db('persondata').collection('users').insertOne(req.body,(err,result)=>{
      if (err){
        return res.status(500).send(' Error inserting data')
      }else{
        res.send('data Inseted..')
      }
      client.close()
    })
  })
})

module.exports = router;
