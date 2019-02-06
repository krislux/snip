/**
 * CLI script for adding users.
 * 
 * Run this script with `npm run adduser <username>`. Will then ask for password.
 * 
 * @todo Hide password when entering
 */

/* eslint no-console: "off" */
require('dotenv').config();
const db = require('./inc/db.js');
const bcrypt = require('bcrypt');

const readline = require('readline');
const ri = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

if (process.argv[2] && ! process.argv[3]) {
    ri.question('Adding user "' + process.argv[2] + '" to database.\nPlease enter password: ', password => {
        let username = process.argv[2];

        if ( ! password || password.length < 4) {
            console.log('Please enter a password of a least 4 characters.');
            ri.close();
        }
        else {
            bcrypt.hash(password, 10, function(err, hash) {
                if (err) {
                    console.log(err);
                    process.exit(1);
                }

                db.open().then(db => {
                    let stmt = db.prepare('INSERT INTO users (username, password, created_at) VALUES (?, ?, DATETIME(\'now\'))');
                    stmt.run(username, hash);
                    stmt.finalize(err => {
                        if (err) {
                            console.log('Error', err);
                        }
                        ri.close();
                    });
                });
            });

        }

    });
}
else {
    console.log('Invalid params. Usage: npm run adduser <username>');
    ri.close();
}
