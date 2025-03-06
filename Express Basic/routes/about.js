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

    const value = {name : 'Rashik',admin : true }
    res.render('about',{value : 'I am about page...!',namelist:namelist,value:value})
})
module.exports = router