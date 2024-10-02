const express = require('express');
const bodyParser = require('body-parser');
const db = require('./utils/db');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: false,
    })
);

app.get('/', (req, res) => {
    res.sendFile('views/index.html', {
        root: __dirname,
    });
});

app.post('/shorten', (req, res) => {
    db.query('SELECT * FROM urls', (error, results, fields) => {
        if (error) {
            res.send(error);
        } else {
            let url = req.body.url;
            let short = req.body.short;
            let shortExists = false;
            let shortExistsIndex = 0;
            console.log(url);
            for (let i = 0; i < results.length; i++) {
                if (results[i].short === short) {
                    shortExists = true;
                    shortExistsIndex = i;
                }
            }

            if (!url) {
                res.json({
                    error: 'Please enter a valid url',
                });
            }

            if (!short) {
                short = Math.random().toString(36).substring(2, 8);
            }

            if (shortExists) {
                res.json({
                    error: 'short url is already taken',
                });
            } else {
                db.query(
                    'INSERT INTO urls (url, short) VALUES (?, ?)',
                    [url, short],
                    (error, results, fields) => {
                        if (error) {
                            res.json(error);
                        } else {
                            res.json({
                                success: `Boom! Your short url is: <a href="http://localhost:3000/${short}" target="_blank">http://localhost:3000/${short}</a>`,
                            });
                        }
                    }
                );
            }
        }
    });
});

app.get('/:short', (req, res) => {
    db.query('SELECT * FROM urls', (error, results, fields) => {
        if (error) {
            res.send(error);
        } else {
            let short = req.params.short;
            let shortExists = false;
            let shortExistsIndex = 0;
            for (let i = 0; i < results.length; i++) {
                if (results[i].short === short) {
                    shortExists = true;
                    shortExistsIndex = i;
                }
            }
            if (shortExists) {
                res.redirect(results[shortExistsIndex].url);
            } else {
                res.send({
                    error: 'short url is not taken',
                });
            }
        }
    });
});

app.listen(port, () => {
    console.log(`Shorturl listening at http://localhost:${port}`);
});
