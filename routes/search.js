const express = require('express')
const axios = require('axios')
const router = express.Router()


const TMDB_API_KEY = 'a988fcd9e31ef8f416ad0b604672f48c'


router.get('/',async (req,res)=>{
    try{
        const query = req.query.q
        if (!query){
            return res.status(400).send('Query Parameter is require')
        }
        const response = await axios.get("https://api.themoviedb.org/3/search/movie",{
            params : {
                api_key : TMDB_API_KEY,
                query : query,
                language : 'en-US',
                page : 1
            }
        })
        const movies = response.data.results;
        if (!movies || movies.length == 0){
            return res.status(404).send('No Movie found')
        }
        const firstMovie = movies[0]
        const movieDetails = await axios.get(`https://api.themoviedb.org/3/movie/${firstMovie.id}`, {
            params: {
                api_key: TMDB_API_KEY,
                language: "en-US",
            }
        });
        if (!req.session.recentlyViewed){
            req.session.recentlyViewed = []
        }
        req.session.recentlyViewed = req.session.recentlyViewed.filter(item=>item.id !== firstMovie.id)

        req.session.recentlyViewed.unshift({
            id : firstMovie.id,
            title : firstMovie.title,
            poster_path : firstMovie.poster_path
        })

        if (req.session.recentlyViewed.length > 10) {
            req.session.recentlyViewed.pop()
        }
        

        res.render("search_result", { 
            movie: movieDetails.data ,
            username : req.session.username,
            profilepicture : req.session.profilepicture,
            recentlyViewed : req.session.recentlyViewed
        })
    }catch(error){
        console.log('error fetching data ',error.response?.data||error.message)
        res.status(500).send('error fetching movies details')
    }
})


module.exports=router