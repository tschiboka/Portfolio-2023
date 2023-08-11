const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require('cors');                                      // CORS Settings

// Cross-Origin Shared Resources
app.use(express.json({
    type: ['application/json', 'text/plain']
}));

app.use(cors({
    methods: 'GET, POST, PUT, DELETE',
    origin: "*"
}));

// Routes
const index = require("./routes/index");
const message = require("./routes/message");
app.use("/", index);
app.use("/message", message);

// Listen to Port
const PORT = process.env.PORT || 5000;

// Cyclic Server Needs DB Connection First then Server Listen
mongoose.connect(process.env.DB_STRING) // mongodb://127.0.0.1:27017/portfolio-website
    .then(() => {
        console.log("Connected to DB");
        app.listen(PORT, () => console.log(`Listening ${PORT}... `));
    })
    .catch(err => console.log(err));