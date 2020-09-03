const express = require('express')
const router = express.Router()

//root of application
router.get('/', (req, res) =>{
    res.render('index')
})

module.exports = router