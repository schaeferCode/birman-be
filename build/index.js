"use strict";
require('dotenv').config();
var app = require('./app');
// start server
var port = process.env.PORT || 3000;
app.listen(port);
// eslint-disable-next-line no-console
console.log("Server listening at " + port);
