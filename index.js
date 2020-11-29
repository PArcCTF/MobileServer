const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');

// Constants
const PORT = 9053;
const HOST = '0.0.0.0';

app.use(bodyParser.urlencoded({ extended: false }));


app.all('*', (req, res) => {
    return res.status(404).send('404 page not found');
});

app.all('/api/login', async (req, res, next) => {
    // Log login requests on a local file for debugging.
    try {
        const log_entry = {
            'path': req.originalUrl,
            'method': req.method,
            'query': req.query
        }

        fs.writeFile('authlog.txt', JSON.stringify(log_entry) + '\r\n', { flag: "a+" }, (err) => {});
    }
    catch (e) {
        console.log(e)
    }

    // @todo Make it work! Return 401 Unauthorized until then.
    return res.status(401).send('Unauthorized.');
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);