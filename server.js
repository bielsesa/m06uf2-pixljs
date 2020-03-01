const express = require('express');
const app = express();
const fs = require('fs');
const port = 3000;
app.use(express.static('docs'));

app.get('/pixljs/main', (req, res) => {
    fs.readFile(`${__dirname}/main.js`, 'utf-8', (err, data) => {
        if (err) {
            console.log(`No s'ha pogut llegir l'arxiu`);
            // res.writeHead(500, {
            //     "Content-Type": "text/plain; charset=utf-8"
            // });
            res.set({
                'Content-Type': 'text/plain',
                'Status': 500
            });
            res.send(`No s'ha pogut llegir l'arxiu`);
            return;
        }
        const content = data;
    
        // Invoke the next step here however you like
        console.log(JSON.stringify(content));   // Put all of the code here (not the best solution)
        // res.writeHead(200, {
        //     "Content-Type": "text/plain; charset=utf-8"
        // });
        res.set({
            'Content-Type': 'text/javascript',
            'Status': 200
        });
        res.send(content);
    });        
});

app.listen(port, () => console.log(`Escoltant pel port ${port}!`))