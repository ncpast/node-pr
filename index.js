const express = require('express');
const app = express();

const chalk = require('chalk');
const port = 3000;

const fs = require('fs');
const fileLoader = require('./load-assets');
fileLoader(app, 'assets');

app.get('/', async(req, res) => {
    console.log(chalk.green(`New GET request at http://${req.hostname}:${port + req.url}`));
    if (req.query.msg && req.query.color) {
        res.send(`<h1 style="color: ${req.query.color}">${req.query.msg}</h1>`);
    } else {
        res.sendFile("assets/index.html", { root: __dirname });
    };
});

app.get('/data', async(req, res) => {
    res.sendFile('post/data.json', { root: __dirname })
});

app.post('/data', async(req, res) => {
    let rawJson;
    let recData;
    fs.readFile('post/data.json', async(err, data) => {
        rawJson = JSON.parse(data);
        rawJson.push({
            "id": rawJson.length,
            "title": req.get('title'),
            "user": req.get('user'),
            "content": req.get('content')
        });

        recData = JSON.stringify(rawJson, null, 2);
        console.log(chalk.yellow('Data received from a post request: ') + recData);
        fs.writeFileSync('post/data.json', recData);
        await res.status(200).send('Data received');
    });
});

app.all('*', async(req, res) => {
    res.status('404').sendFile('assets/404.html', { root: __dirname });
});

app.listen(port, () => {
    console.log(chalk.greenBright(`• Server running at http://localhost:${port}/`));
});