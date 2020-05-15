require('dotenv').config();
const express = require('express');
const cors = require('cors');
const http = require('http');
const bodyParser = require('body-parser');
const randomstring = require('randomstring');
const db = require('./lib/db.js');
const Snip = require('./snip.js');

const app = express();
app.use(cors());
app.use(bodyParser.json({ type: 'application/json' }));

app.use(express.static('public'));

/**
 * Return data from specific snip set by :id as JSON
 */
app.get('/get/:id', async (req, res) => {
    res.setHeader('Content-Type', 'application/json');

    db.open().then(db => {
        db.get('SELECT * FROM snips WHERE id=?', [
            req.params.id
        ], (err, row) => {
            if (err || ! row) {
                res.send({ success: false, error: err });
            }
            else {
                res.send({
                    success: true,
                    html: row.html,
                    css: row.css,
                    javascript: row.javascript,
                    view: row.view
                });
            }
        });
    });
});

/**
 * Similar to /get, but returns a rendered HTML page for preview
 * from a specific snip :id instead of JSON data.
 */
app.get('/render/:id', async(req, res) => {
    res.setHeader('Content-Type', 'text/html');

    db.open().then(db => {
        db.get('SELECT * FROM snips WHERE id=?', [
            req.params.id
        ], (err, row) => {
            if (err) {
                res.send({
                    success: false,
                    error: err
                });
                res.end();
            }
            Snip.render(row.html, row.css, row.javascript, output => {
                res.send(output);
            });
        });
    });
});

/**
 * Similar to /get, but returns a rendered HTML page for pr eview
 * from a specific snip :id instead of JSON data.
 */
app.post('/preview', async(req, res) => {
    res.setHeader('Content-Type', 'text/html');

    Snip.render(
        req.body.html,
        req.body.css,
        req.body.javascript,
        output => {
            res.send(output);
        }
    );
});

/**
 * Save new snip, or update existing if req.body.id provided.
 */
app.post('/save', async (req, res) => {
    let snip_id = (req.body.id && req.body.id.length === 7) ? req.body.id : null;

    db.open().then(db => {

        db.get('SELECT users.rowid as id, username FROM users JOIN tokens ON tokens.user_id=users.rowid WHERE tokens.token=?', [
            req.body.token
        ], (err, user) => {
            if (err || ! user.id) {
                res.send({
                    success: false,
                    error: err
                });
                res.end();
            }

            // Delete old login tokens. This is run too often here, should be moved to cronjob.
            db.run('DELETE FROM tokens WHERE created_at < DATETIME(\'now\', \'-30 day\')');

            if (snip_id) {
                // Overwrite save
                db.run('UPDATE snips SET html=?, css=?, javascript=?, view=?, updated_at=DATETIME(\'now\') WHERE id=? AND user_id=?', [
                    req.body.html,
                    req.body.css,
                    req.body.javascript,
                    req.body.view,
                    snip_id,
                    user.id
                ], function(err) {
                    res.setHeader('Content-Type', 'application/json');
                    if (this.changes === 0) {
                        res.send({
                            success: false,
                            error: 'No rows updated, likely user didn\'t own snip',
                            id: snip_id
                        });
                    }
                    else {
                        res.send({
                            success: !err,
                            error: err,
                            id: snip_id
                        });
                    }
                });
            }
            else {
                // New save
                snip_id = randomstring.generate(7);

                db.run('INSERT INTO snips (id, html, css, javascript, view, user_id, created_at) VALUES (?, ?, ?, ?, ?, ?, DATETIME(\'now\'))', [
                    snip_id,
                    req.body.html,
                    req.body.css,
                    req.body.javascript,
                    req.body.view,
                    user.id
                ], err => {
                    res.setHeader('Content-Type', 'application/json');
                    res.send({
                        success: !err,
                        error: err,
                        id: snip_id
                    });
                });
            }
        });
    });
});

app.post('/login', async (req, res) => {
    res.setHeader('Content-Type', 'application/json');

    db.open().then(db => {
        db.get('SELECT *, rowid as id FROM users WHERE username=?', [
            req.body.username
        ], (err, row) => {
            if ( ! err && row) {
                require('bcrypt').compare(req.body.password, row.password, (err, result) => {
                    if ( ! err && result === true) {
                        let token = randomstring.generate(60);

                        db.run('INSERT INTO tokens (token, user_id, created_at) VALUES (?, ?, DATETIME(\'now\'))', [
                            token,
                            row.id,
                        ], err => {
                            if ( ! err) {
                                res.send({
                                    success: true,
                                    token: token
                                });
                            }
                            else {
                                res.send({
                                    success: false,
                                    error: 'Could not create token' + err
                                });
                            }
                        });
                    }
                    else {
                        res.send({
                            success: false,
                            error: 'Incorrect password'
                        });
                    }
                });
            }
            else {
                res.send({
                    success: false,
                    error: 'User not found\n' + err
                });
            }
        });
    });
});

if (process.env.HTTPS) {
    const https = require('https');
    const fs = require('fs');
    
    https.createServer({
        key: fs.readFileSync(process.env.SSL_KEY || 'server.key'),
        cert: fs.readFileSync(process.env.SSL_CERT || 'server.cert')
    }, app).listen(443);

    // Redirect everything to https
    http.createServer()
    http.createServer(function (req, res) {
        res.writeHead(301, { "Location": "https://" + req.headers.host + req.url });
        res.end();
    }).listen(80);
}
else {
    http.createServer({}, app).listen(process.env.PORT || 80);
}
