// logger.js
const winston = require('winston');

const logger = winston.createLogger({
  level: 'info', // Use 'debug', 'warn', 'error' as needed
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console(), // Show logs in terminal
    new winston.transports.File({ filename: 'logs/app.log' }) // Save logs to file
  ]
});

module.exports = logger;
