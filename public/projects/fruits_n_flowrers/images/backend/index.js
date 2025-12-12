require('dotenv').config();
const express = require("express");
const winston = require("winston");
const app = express();
const PORT = process.env.PORT || 3000;
const visitorsRoutes = require("./routes/visitors");
const helmet = require("helmet");
require("./startup/db")();



app.use(helmet());



winston.add(winston.transports.File, { filename: "logfile.log" });
winston.info(`Listening on port ${PORT}`);



app.use(require("body-parser").json());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(visitorsRoutes);



app.listen(PORT, () => console.log(`Listening on port: ${PORT}...`));