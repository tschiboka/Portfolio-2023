require('express-async-errors');
const http = require('http');
const express = require("express");
const app = express();
const cors = require('cors');                                      
const error = require('./middlewares/error');
const { WebSocketServer } = require("ws");

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

const server = http.createServer(app); 
require('./projects/word_duel_arena/ws')(server)

const PORT = process.env.PORT || 5000

server.listen(PORT, () => console.log(`Listening on ${PORT}`))