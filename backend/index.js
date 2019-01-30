require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const randomstring = require('randomstring');
const db = require('./inc/db.js');

const app = express();
app.use(cors());
app.use(bodyParser.json({ type: 'application/json' }));

db.open().then(console.log);

app.get('/get/:id', async (req, res, next) => {
    db.open().then(db => {
        db.each('SELECT rowid, * FROM snips', (err, row) => {
            console.log(row);
        });
    });

    res.send(req.params.id);
});

app.post('/save/:id?', async (req, res, next) => {
    // if (req.params.id)
    
    db.open().then(db => {
        let token = randomstring.generate(7);

        let stmt = db.prepare('INSERT INTO snips (token, html, css, javascript) VALUES (?, ?, ?, ?)');
        stmt.run(
            token,
            req.body.html,
            req.body.css,
            req.body.javascript
        );
        stmt.finalize();
    });
});

app.listen(process.env.PORT);
