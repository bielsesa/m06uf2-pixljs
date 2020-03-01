const express = require('express');
const app = express();
const fs = require('fs');
const port = 3000;
app.use(express.static('docs'));

app.get('/pixljs/main', (req, res) => {
    fs.readFile(`${__dirname}/main.js`, 'utf-8', (err, data) => {
        if (err) {
            console.log(`No s'ha pogut llegir l'arxiu`);
            res.set({
                'Content-Type': 'text/plain',
                'Status': 500
            });
            res.send(`No s'ha pogut llegir l'arxiu`);
            return;
        }
        const content = data;
    
        console.log(JSON.stringify(content)); 
        res.set({
            'Content-Type': 'text/javascript',
            'Status': 200
        });
        res.send(content);
    });        
});

app.listen(port, () => console.log(`Escoltant pel port ${port}!`))