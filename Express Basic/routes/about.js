var express = require('express')
var router = express.Router()

router.get('/',(req,res,next) => {
    var namelist = [
        'Dineesha',
        'Maleeha',
        'Farsana',
        'Alna',
        'Akaash',
        'Rashik',
        'Sarath'
    ]
    res.render('about',{value : 'I am about page...!',namelist:namelist})
})
module.exports = router