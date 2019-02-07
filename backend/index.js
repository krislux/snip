require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const randomstring = require('randomstring');
const fs = require('fs');
const db = require('./inc/db.js');

const app = express();
app.use(cors());
app.use(bodyParser.json({ type: 'application/json' }));

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
            if (err)
                res.end('Error');

            fs.readFile('backend/template.html', (err, data) => {
                let html = data.toString();
                if ( ! err) {
                    html = html.replace('#html#', row.html);
                    html = html.replace('#css#', row.css);
                    html = html.replace('#javascript#', row.javascript);

                    res.end(html);
                }
            });
        });
    });
});

/**
 * Save new snip, or update existing if :id provided.
 */
app.post('/save/:id?', async (req, res) => {
    // if (req.params.id)

    db.open().then(db => {
        let id = randomstring.generate(7);

        db.run('INSERT INTO snips (id, html, css, javascript, view, permanent) VALUES (?, ?, ?, ?, ?, ?)', [
            id,
            req.body.html,
            req.body.css,
            req.body.javascript,
            req.body.view,
            req.body.permanent ? 1 : 0
        ], err => {
            res.setHeader('Content-Type', 'application/json');
            res.send({
                success: !err,
                id: id,
                push: !!req.body.permanent
            });
        });
    });
});

app.post('/login', async (req, res) => {
    res.setHeader('Content-Type', 'application/json');

    db.open().then(db => {
        // db.run('DELETE FROM tokens WHERE created_at < DATETIME(\'now\', \'-30 day\')');

        let stmt = db.prepare('SELECT * FROM users WHERE username=?');
        stmt.get(req.params.username, (err, row) => {
            if ( ! err && row) {
                require('bcrypt').compare(req.params.password, row.password, (err, res) => {
                    if ( ! err && res === true) {
                        let token = randomstring.generate(60);

                        db.run('INSERT INTO tokens (token, username, created_at) (?, ?, DATETIME(\'now\'))', [
                            token,
                            req.params.username,
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
                                    error: 'Could not create token'
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
                    error: 'User not found'
                });
            }
        });
    });
});

app.listen(process.env.PORT);
