module.exports = function () {
    const mongoose = require("mongoose");
    const password = process.env.MONGO_PASSWORD;
    const connectionString = `mongodb+srv://tschiboka:${password}@fruits-n-flowers-oloki.mongodb.net/test?retryWrites=true&w=majority`;
    const winston = require("winston");



    mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => console.log("Connected to database..."))
        .catch((err) => {
            console.log(`Could not connect to database: ${err}`);
            winston.error(err.message, err);
        });




    mongoose.set('useCreateIndex', true); // current version needs this setting otherwise coughing up warnings
}