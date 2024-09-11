const express = require('express');
const router = express.Router();

router.get('/help',(req,res,next)=>{
    res.render('../views/help');
})
router.get('/about',(req,res,next)=>{
    res.render('../views/about');
})
module.exports = router