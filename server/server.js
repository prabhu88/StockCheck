import appModulePath from 'app-module-path';
import http from 'http';
import express from 'express';
import cors from 'cors';
const fs = require('fs')
const path = require('path');
var morgan = require('morgan')
const winston_logger = require('./logger')
const {dbSetup,serverPort} = require('./constants')
var bodyParser = require('body-parser')
var async = require('async')
var loginRouter = require('./router/loginRouter')
appModulePath.addPath(`${__dirname}`);

const Api = express();
async.waterfall([
    (callback)=>{
        Api.use(cors());
        Api.use(bodyParser.json({ limit: '50mb' }));
        Api.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
        Api.use(morgan('combined', { stream: winston_logger.stream }));
        Api.use('/auth',loginRouter);
        Api.get('/test', (req, res) => {            
            res.status(200).send('success!')
        });
        
        Api.use('*', function (req, res) {
            res.status(404).send('Page Not Found');
            res.end();
        });
        callback(null, true);
    }
],(error,response) => {
    if(error){
        console.log(error)
    }
    else{
        const server = http.Server(Api);
        server.once('error', function(err) {
            if (err.code === 'EADDRINUSE') {
                console.log('port is used')
                server.close();
            }
        });
          
        server.once('listening', function() {            
            console.log(`listening once on *:${serverPort}`);
        });
        server.listen(serverPort, () => {
            console.log(`listening on *:${serverPort}`);
            if(fs.existsSync(dbSetup)){
                require(dbSetup)
            }
        });
    }
})

