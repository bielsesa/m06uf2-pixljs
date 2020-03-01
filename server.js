const express = require('express');
const app = express();
const fs = require('fs');
const port = 3000;
app.use(express.static('docs'));

app.get('/pixljs/main', (req, res) => {
    res.writeHead(200, {
        "Content-Type": "text/javascript; charset=utf-8"
        });
    
    console.log(`Enviant main.js:\n${fs.readFile(`${__dirname}/main.js`)}`);
    res.sendFile(`${__dirname}/main.js`);
    res.end();
});

app.listen(port, () => console.log(`Escoltant pel port ${port}!`))