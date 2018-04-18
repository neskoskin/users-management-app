'use strict';
const userController = require('../controllers/users.controller');

module.exports = (app) => {
    // Endpoint for fetching the users
    app.get('/users', userController.listUsers);
    // Endpoint for creating a user
    app.post('/user', userController.createUser);

    // Long Polling
    const longpoll = require("express-longpoll")(app);
    longpoll.create("/userchanges", { maxListeners: 100 });
}