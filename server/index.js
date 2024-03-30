const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require('cors');                                      // CORS Settings
const PORT = process.env.PORT || 5000;

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
const schedule = require("./routes/schedule");
const settings = require("./routes/settings")
const user = require("./routes/user");
const login = require("./routes/login");
const confirm = require("./routes/confirm");
app.use("/", index);
app.use("/message", message);
app.use("/visit", visit);
app.use("/like", like);
app.use("/schedule", schedule);
app.use("/api/settings", settings);
app.use("/api/user", user);
app.use("/api/login", login);
app.use("/api/confirm", confirm);


// Cyclic Server Needs DB Connection First then Server Listen
mongoose.connect(process.env.DB_STRING) // mongodb://127.0.0.1:27017/portfolio-website
    .then(() => {
        console.log("Connected to DB");
        app.listen(PORT, () => console.log(`Listening ${PORT}... `));
    })
    .catch(err => console.log(err));


// Error Handling
process.on('unhandledRejection', (reason, promise) => { 
    console.log('Unhandled Rejection at:', promise, 'reason:', reason);
    // Handle the error or log it appropriately.
});
    