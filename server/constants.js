const { setDefaultResultOrder } = require('dns');
const path = require('path')

// ************************************************************
// Database Constants
// ************************************************************

const mainDBpath = path.join(__dirname,'/data/');
const mainDBname = 'main.db';
const mindDB = mainDBpath + mainDBname;
const DB_EXT = ".db";
const DB_LIMIT_SIZE = 2;
const DB_LIMIT_EXT = "MB";
const initialDBsetupFile = path.join(__dirname,'/test.js');

// ************************************************************
// Server Constants
// ************************************************************

const serverPort = 9001;

const LOG_FILE_PATH = path.join(__dirname,'/logs/');
const LOG_FILE_MAX_SIZE = '5242880';
const TOTAL_LOG_FILE = '100';
exports.LOG_LEVEL = 'info';
exports.LOG_LVL_ERROR = 'error';
exports.LOG_LVL_INFO = 'info';

module.exports = {
    mainDBpath:mainDBpath,
    DB_EXT : DB_EXT,
    dbPath : mindDB,
    dbName : mainDBname,
    dbSetup : initialDBsetupFile,
    serverPort : serverPort,
    LOG_FILE_PATH : LOG_FILE_PATH,
    LOG_FILE_MAX_SIZE : LOG_FILE_MAX_SIZE,
    TOTAL_LOG_FILE : TOTAL_LOG_FILE
}