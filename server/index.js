const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require('cors');                                      // CORS Settings
const PORT = process.env.PORT || 5000;
const cron = require("node-cron");
const dailyEmail = require("./scheduled/dailyEmail");

app.use(express.json({
    type: ['application/json', 'text/plain']
}));

// Cross-Origin Shared Resources
const allowAllOrigin = true;
app.use(cors({
    methods: 'GET, POST, PUT, DELETE',
    origin: (allowAllOrigin ? "*" : ['https://tschiboka.co.uk'])
}));

// Routes
const index = require("./routes/index");
const message = require("./routes/message");
const visit = require("./routes/visit");
const like = require("./routes/like");
app.use("/", index);
app.use("/message", message);
app.use("/visit", visit);
app.use("/like", like);


// Cyclic Server Needs DB Connection First then Server Listen
mongoose.connect(process.env.DB_STRING) // mongodb://127.0.0.1:27017/portfolio-website
    .then(() => {
        console.log("Connected to DB");
        app.listen(PORT, () => console.log(`Listening ${PORT}... `));
    })
    .catch(err => console.log(err));


// Email Scheduler
// cron.schedule('0 0 0 * * *', () => {
//     dailyEmail();
// });

// Email Scheduler
cron.schedule('0 0 16 * * *', () => {
    dailyEmail();
    console.log("HERE")
}, {timezone: "Europe/London"});
