const { default: axios } = require('axios')
const express = require('express')
const router = express.Router()


router.get('/:id',async (req,res)=>{
   try {
    const movieId = req.params.id
    const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}`,{
        params : {
            api_key : 'a988fcd9e31ef8f416ad0b604672f48c',
            language : 'en-US',
        }
    })
    res.render('watching_page',{title:response.data.title,movie:response.data})
   }catch (error) {
    console.log('Error fetching details',error.response?.data || error.message)
    res.status(500).send('Error fetching movie details')
   }
})


module.exports = router;