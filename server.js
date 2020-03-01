const express = require('express');
const app = express();
const fs = require('fs');
const port = 3000;
app.use(express.static('docs'));

app.get('/pixljs/main', (req, res) => {
    res.sendFile('./main.js');
});

app.listen(port, () => console.log(`Escoltant pel port ${port}!`))