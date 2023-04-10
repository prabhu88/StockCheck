import {AddClient,ListClient,UpdateClient} from '../service/clientService'
var router = require('express').Router()
router.get('/listAllClient',function(req,res){    
    ListClient(req,res)
})

router.post('/new',function(req,res){
    AddClient(req,res)
})

router.put('/update/:id',function(req,res){
    UpdateClient(req,res)    
})

router.delete('/delete',function(req,res){
    res.status(200).send({
        data:'No Client were updated'
    });
})

module.exports = router