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
    const page =  parseInt (req.query.page) || 1
    if (page < 1) page = 1;
    const response = await axios.get("https://api.themoviedb.org/3/movie/popular", {
      params: {
        api_key: "API_KEY",  
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
    console.error("Error fetching movies:", error.response?.data || error.message);
    res.status(500).send("Error fetching movies.");
  }
});




module.exports = router;
