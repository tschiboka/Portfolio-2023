const moment = require('moment');
const { Log } = require('../models/log');

module.exports = async function (err, req, res, next) {
    process.on('uncaughtException', ex => {
        throw ex;
    });
    
    process.on('unhandledRejection', ex => {        
        throw ex;
    });

    const { message, name, stack } = err;
    const timestamp = moment().format('ddd MMM DD YYYY HH:mm:ss');
    const error = {
        timestamp,
        name,
        message,
        stack
    };

    const log = new Log(error);
    await log.save();

    console.log(err)
    
    res.status(500).send({ success: false, message: 'Internal Server Error', error: err });
}