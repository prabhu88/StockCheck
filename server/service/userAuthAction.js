var Promise = require('bluebird')
const db = require('../SQL/utility')
const log = require('../logger').logger
const md5 = require('md5')
const {} = require('../constants')
function login(req){    
    let username = req.body.loginId ? req.body.loginId :  ''
    let password = req.body.loginPassword ? req.body.loginPassword : ''
    password = md5(password)
    let query = "SELECT * FROM user where username = '"+username+"' and password = '"+password+"'";
    return new Promise(function(resolve,reject){
        log.log("info", "Entering userAuthAction.js :: login Function");
        return db.fetch(query,'main').then((rows,err)=>{
            if(err){
                reject({ error: err, statusCd: 0 });
            }
            console.log(rows);
            if(rows.length > 0){
                resolve({error_state : false,data : rows})
            }   
            resolve({ error_state : true,error: 'username or password incorrect', statusCd: 1 });
        })
    })
}
module.exports = {
    login : login    
}