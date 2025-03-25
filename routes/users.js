var express = require('express');
var router = express.Router();
var db = require('../config/connection')


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('user_account', {title:'USER CREATION'});
});


router.post('/submit',async (req,res)=>{
 try {
  const {username,phonenumber,email,password} = req.body
  const database = db.get()

  if (!database){
    return res.status(500).send('The User Does t Created account ..')
  }

  const userColloction = database.collection('users')
  const result = await userColloction.insertOne({
    username,
    phonenumber,
    email,
    password
  })
  console.log('User inserted..'+result.insertedId)
  res.send('User data saved successfully ')
 }catch (error) {
  console.error('error Inserted data',error)
  res.status(500).send('Error saving user')
 }

  
})




module.exports = router;
