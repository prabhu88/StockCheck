'use strict';
const winston = require('winston');
const datetime = require('date-and-time')
const constants = require('./constants');
const log_dir = constants.LOG_FILE_PATH;
let dt = new Date();
var options = {
	file: {
    level: 'error',
    filename: log_dir+"/log_"+datetime.format(dt,'YYYY-MM-DD')+"_.log",
    handleExceptions: true,
    json: true,
    maxsize : constants.LOG_FILE_MAX_SIZE,
    maxFiles : constants.TOTAL_LOG_FILE,
    colorize: true,
  },
  console: {
    level: 'info',
    handleExceptions: true,
    json: false,
    colorize: true,
  },
};
options.file.level = constants.LOG_LEVEL;
const  logger = winston.createLogger({
  transports: [
		new winston.transports.File(options.file),
    new winston.transports.Console(options.console)
  ],
  exitOnError: false,
});
logger.stream = {
  write: function(message, encoding) {    
    logger.info(message);
  },
};
exports.logger = logger;