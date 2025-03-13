var express = require('express');
var router = express.Router();
const { MongoClient } = require('mongodb');
const bodyParser = require('body-parser');

/* GET home page. */
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.get('/', function(req, res, next) {
  moviesList = [
    {
      title : "Thriller",
      year : 2024,
      discription : "The adventures of a group of explorers who make use of a newly discovered wormhole to surpass the limitations on human space travel and conquer the vast distances involved in an interstellar voyage.",
      moviepic : 'https://th.bing.com/th/id/OIP.wRrh_biYR_xkAiHCn4HePgHaK9?rs=1&pid=ImgDetMain'
    
    },
    {
      title : "The Godfather",
      year : 1972,
      discription : "The The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son. of a group of explorers who make use of a newly discovered wormhole to surpass the limitations on human space travel and conquer the vast distances involved in an interstellar voyage.",
      moviepic : 'https://th.bing.com/th/id/OIP.eqAqwN06RtHHpw_23vCbkgHaE8?rs=1&pid=ImgDetMain'
    
    },
    {
      title : " Interstellar",
      year : 2014,
      discription : "The When Earth becomes uninhabitable in the future, a farmer and ex-NASA pilot, Joseph Cooper, is tasked to pilot a spacecraft, along with a team of researchers, to find a new planet for humans. of a group of explorers who make use of a newly discovered wormhole to surpass the limitations on human space travel and conquer the vast distances involved in an interstellar voyage.",
      moviepic : 'https://th.bing.com/th/id/OIP.JymutQOaBSxOAXmuij9g-wAAAA?rs=1&pid=ImgDetMain'
    
    },
    {
      title : "Avengers EndGame",
      year : 2024,
      discription : "After the devastating events of Avengers: Infinity War (2018), the universe is in ruins. With the help of remaining allies, the Avengers assemble once more in order to reverse Thanos actions and restore balance to the universe.",
      moviepic : 'https://th.bing.com/th/id/OIP.8Y0Z68LfmR7EfZNOq30b7wHaHa?rs=1&pid=ImgDetMain'
    
    }
  ]
  console.log(moviesList)
  res.render('index', {moviesList,admin:true});
});




module.exports = router;
