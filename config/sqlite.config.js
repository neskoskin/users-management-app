'use strict';

const sqlite3 = require('sqlite3').verbose();

exports.ready = () => {
    return new Promise((resolve, reject) => {
        let db = new sqlite3.Database('../users.sqlite', (reject, () => {
            resolve(db);
        }));
    });
}

exports.ready()
    .then((db) => {
        db.run('CREATE TABLE IF NOT EXISTS users (username text)');
    })
    .catch(err => console.error(err));