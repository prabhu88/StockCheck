var router = require('express').Router()
const {login} = require('../service/userAuthService')
router.post('/login',function(req,res){
    login(req,res)
})

module.exports = router