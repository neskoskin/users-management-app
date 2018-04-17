'use strict';

const sqlite = require('../../config/sqlite.config');
// The sqlite query to fetch the users 
exports.listUsers = (req, res) => {
    sqlite.ready()
        .then((db) => {
            db.all('SELECT * FROM users', (err, rows) => {
                if (err) {
                    db.close();
                    return res.error(err);
                }
                db.close();
                res.json(rows);
            });
        })
        .catch(err => res.error(err));
}
// The sqlite query to insert a new user
exports.createUser = (req, res) => {
    sqlite.ready()
        .then((db) => {
            db.run(`INSERT INTO users VALUES(?)`, [req.body.username], (err) => {
                if (err) {
                    db.close();
                    return console.log(err.message);
                }

                db.close();
                //Send to long-polling channel;
                require('express-longpoll')(req.app).publish('/userchanges', { username: req.body.username });
                res.json({ username: req.body.username });
            });
        })
        .catch(err => res.error(err));
}
