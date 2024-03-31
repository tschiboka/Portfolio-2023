const mongoose = require("mongoose");
const PORT = process.env.PORT || 5000;

// Cyclic Server Needs DB Connection First then Server Listen
module.exports = function(app) {
    mongoose.connect(process.env.DB_STRING) // mongodb://127.0.0.1:27017/portfolio-website
    .then(() => {
        console.log("Connected to DB");
        app.listen(PORT, () => console.log(`Listening ${PORT}... `));
    })
    .catch(err => console.log(err));
}
