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
        let stmt = db.prepare('SELECT * FROM snips WHERE id=?');
        stmt.get(req.params.id, (err, row) => {
            if (err || ! row) {
                res.send({ success: false, error: err });
            }
            else {
                res.send({
                    success: true,
                    html: row.html,
                    css: row.css,
                    javascript: row.javascript
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
        let stmt = db.prepare('SELECT * FROM snips WHERE id=?');
        stmt.get(req.params.id, (err, row) => {
            if (err)
                res.end('Error');

            fs.readFile('backend/template.html', (err, data) => {
                let html = data.toString();
                if (!err) {
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

        let stmt = db.prepare('INSERT INTO snips (id, html, css, javascript, permanent) VALUES (?, ?, ?, ?, ?)');
        stmt.run(
            id,
            req.body.html,
            req.body.css,
            req.body.javascript,
            req.body.permanent ? 1 : 0
        );
        stmt.finalize(err => {
            res.setHeader('Content-Type', 'application/json');
            res.send({
                success: !err,
                id: id,
                push: !!req.body.permanent
            });
        });
    });
});

app.listen(process.env.PORT);
