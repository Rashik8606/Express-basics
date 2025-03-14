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
    const response = await axios.get("https://api.themoviedb.org/3/movie/popular", {
      params: {
        api_key: "a988fcd9e31ef8f416ad0b604672f48c",  
        language: "en-US",
        page: 6,
      },
    });

    res.render("index", { movies: response.data.results ,admin:false});
  } catch (error) {
    console.error("Error fetching movies:", error.response?.data || error.message);
    res.status(500).send("Error fetching movies.");
  }
});




module.exports = router;
