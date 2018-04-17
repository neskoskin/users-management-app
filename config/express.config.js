'use strict';

// Import Express and body-parser
const express = require('express'),
    bodyParser = require('body-parser');

module.exports = () => {

    // Init ExpressJS
    const app = express();

    // Set static files folder
    app.use(express.static('public'));

    // We want to be only JSON API. Other data formats will be rejected
    express.json();

    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(bodyParser.json());

    // Set up port to 3000 and start listening
    app.listen(3000);

    require("express-longpoll")(app);

    require('../app/routes/users.route')(app);
}