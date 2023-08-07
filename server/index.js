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
const server = app.listen(PORT, () => console.log(`Listening ${PORT}... `))

mongoose.connect("mongodb://127.0.0.1:27017/portfolio-website")
    .then(() => console.log("Connected to DB"))
    .catch(err => console.log(err));