const express = require('express');
const router = express.Router(); 


router.get('/',(req,res)=>{
    const recentlyViewed = req.session.recentlyViewed || []
    res.render('recently_added', {
        recentlyViewed : recentlyViewed,
        username : req.session.username,
        profilepicture : req.session.profilepicture
    })
})

module.exports = router