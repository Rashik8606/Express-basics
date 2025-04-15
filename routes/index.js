var express = require('express');
var router = express.Router();
const { MongoClient } = require('mongodb');
const bodyParser = require('body-parser');
const axios = require('axios');
require('dotenv').config();

/* GET home page. */
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());



router.get("/", async (req, res) => {
  try {
    let page =  parseInt (req.query.page) || 1
    if (page < 1) page = 1;
    const response = await axios.get("https://api.themoviedb.org/3/movie/popular", {
      params: {
        api_key: "a988fcd9e31ef8f416ad0b604672f48c",  
        language: "en-US",
        page: page,
      },
    });

    const totalPages = response.data.total_pages
    console.log(response.data.results);

    res.render("index", { 
      movies: response.data.results ,
      admin:false,
      currentPage:page,
      totalPages:totalPages,
      username: req.session.username,
      profilepicture: req.session.profilepicture });


  } catch (error) {
    if (error.code === 'ECONNRESET') {
      console.error("Connection to TMDB was reset.");
      return res.status(502).send("TMDB service temporarily unavailable. Please try again.");
    }
    console.error("Error fetching movies:", error.response?.data || error.message);
    res.status(500).send("Error fetching movies.");
  }
});



router.get('/logout', (req, res) => {
  console.log("Logout route hit");
  if (req.session){
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).send('Error logging out');
      }
      res.clearCookie('connect.sid');
      res.redirect('/users');
    })
  }else{
    res.redirect('/users')
  }
});

module.exports = router;

