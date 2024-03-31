require('express-async-errors');
const express = require("express");
const app = express();
const cors = require('cors');                                      
const error = require('./middlewares/error');

app.use(express.json());
app.use(express.json({
    type: ['application/json', 'text/plain']
}));

// Cross-Origin Shared Resources
const allowAllOrigin = true;
app.use(cors({
    methods: 'GET, POST, PUT, DELETE',
    origin: (allowAllOrigin ? "*" : ['https://tschiboka.co.uk'])
}));

require('./startup/routes')(app);
require('./startup/db')(app);
require('./startup/validation')();
require('./startup/prod')(app);

app.use(error);