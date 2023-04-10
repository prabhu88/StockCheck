var Promise = require('bluebird')
const db = require('../SQL/utility')
const log = require('../logger').logger

function NewClient (req){        
    return new Promise((resolve,reject)=>{
        let data = {            
            name : req.body.name ?? '',
            short_name : req.body.short_name ?? '',
            gstin : req.body.gstin ?? '',
            pan : req.body.pan ?? '',
            status : 'Active',
        }
        db.insertData('companies',data).then((result)=>{            
            resolve({
                status_code : 1,
                error : false,
                status_message : 'Client Added Successfully'
            })
        }).catch(err => {
            log.error(`Failed to add Client : ${err}`)
            resolve({
                status_code : 0,
                error : true,
                status_message : `Failed to add client. Err : ${err}`
            })
        })
    })
}

function GetAllClients (){    
    return new Promise((resolve,reject)=>{        
        db.fetch('SELECT * FROM companies ','main').then((result)=>{                        
            resolve({
                status_code : 1,
                error : false,
                data : result
            })
        }).catch(err => {
            log.error(`Failed to add Client : ${err}`)
            resolve({
                status_code : 0,
                error : true,
                status_message : `Failed to add client. Err : ${err}`
            })
        })
    })
}

function ClientUpdate (req){    
    return new Promise((resolve,reject)=>{
        const { id } = req.params;
        db.updateData('companies',id,req.body,'main').then((result)=>{            
            resolve({
                status_code : 1,
                error : false,
                status_message : 'Client Updated Successfully',
                data : req.body
            })
        }).catch(err => {
            log.error(`Failed to update Client : ${err}`)
            resolve({
                status_code : 0,
                error : true,
                status_message : `Failed to update client. Err : ${err}`
            })
        })
    })
}

module.exports = {
    NewClient : NewClient,
    GetAllClients : GetAllClients,
    ClientUpdate : ClientUpdate
}