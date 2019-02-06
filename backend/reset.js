/**
 * CLI script for setting up or resetting the database.
 * 
 * Run this script with `npm run reset`
 * 
 * @todo Back up current database before resetting.
 */

/* eslint no-console: "off" */
require('dotenv').config();
const db = require('./inc/db.js');

console.log('Are you sure you wish to reset the project?\nThis will wipe the db. [NO/yes]');

let stdin = process.openStdin();
stdin.addListener('data', data => {
    if (data.toString().trim() === 'yes') {
        
        let fs = require('fs');
        try {
            fs.mkdirSync(process.env.DB_DIR, {
                recursive: true,
                mode: 0o740
            });
        } catch (exc) { /* we don't care if it exists. */ }

        db.open().then(db => {
            db.serialize(() => {
                db.run('DROP TABLE IF EXISTS snips');

                db.run(`CREATE TABLE snips (
                    id BINARY CHAR(7) PRIMARY KEY,
                    html TEXT,
                    css TEXT,
                    javascript TEXT,
                    permanent TINYINT
                )`, err => {
                    if (err === null) {
                        console.log('Done. Database reset.');
                    }
                    else {
                        console.log('Error: ', err);
                        process.exitCode = 1;
                    }
                    process.exit();
                });
            });
        });
    }
    else {
        process.exit();
    }
});
