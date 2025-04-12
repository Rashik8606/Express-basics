var express = require('express');
var router = express.Router();
var db = require('../config/connection')
const multer = require('multer')



const storage = multer.diskStorage(({
  destination: (req, file, cb)=>{
    cb(null, 'upload/')
  },
  filename: (req, file, cb)=>{
    cb(null, Date.now() + '-' + file.originalname)
  }
}))

const upload = multer ({storage : storage})

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('user_account', {title:'USER CREATION'});
});

// This is Signup Section
router.post('/submit', upload.single('profilepicture') ,async (req,res)=>{
 try {
  const {username,phonenumber,email,password} = req.body
  
  if (!username || !phonenumber || !email || !password){
    res.status(400).send('Please fill all The Fields..')

  }
  const profilepicture = req.file ? req.file.filename : 'default-avatar.png';
  const database = db.get()
  
  if (!database){
    return res.status(500).send('The User Does t Created account ..')
  }

  const userCollection = database.collection('users');

    
    const existingUser = await userCollection.findOne({
      $or: [{ email: email }, { phonenumber: phonenumber }]
    });

    if (existingUser) {
      return res.status(400).send('User already exists with this email or phone number.');
      // Or: res.redirect('/users/login');
    }


  const userColloction = database.collection('users')
  const result = await userColloction.insertOne({
    profilepicture,
    username,
    phonenumber,
    email,
    password
  })
  console.log('User inserted..'+result.insertedId)
  res.redirect(`/users/index/${result.insertedId}`);

 }catch (error) {
  console.error('error Inserted data',error)
  if (!res.headersSent) {
    res.status(500).send('Error saving user');
  }
}
});

// if the users already have account section check
router.get('/index/:id',async (req,res)=>{
  try {
    const database = db.get()
    const userCollection = database.collection('users')
    const userId = req.params.id

    const user = await userCollection.findOne({_id: new db.ObjectId(userId)})

    if(!user){
      return res.status(404).send('User Not found')
    }
    res.render('user_account',{
      title: 'User Account',
      user : user
    })
  }catch(error){
    console.error('Error Fetching Users',error)
    res.status(500).send('Sending Fetching user data')
  }
})


// login section

router.post('/login',async (req,res)=> {
  try{
    const {email, password} = req.body

    if (!email | !password){
      return res.status(400).send('Please fill in all fields')
    }
    const database = db.get()
    const userCollection = database.collection('users')

    const user = await userCollection.findOne({email})

    if(!user) {
      return res.status(400).send('no account found with this email')
    }

    if (user.password !== password) {
      return res.status(400).send('Password is incorrect')
    }
    req.session.username = user.username
    req.session.profilepicture = user.profilepicture
    res.redirect('/')
  }catch(error){
    console.error('Login Error',error)
    res.status(500).send('Internal server error')
  }
})


// LogOut Section

router.get('/logout', (req,res) =>{
  req.session.destroy((err)=>{
    if(err){
      return res.status(500).send('Error logging out')
    }
    res.redirect('/login')
  })
})

module.exports = router;
