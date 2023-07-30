const express = require("express");
const app = express();


// Listen to Port
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => console.log(`Listening ${PORT}... `))

