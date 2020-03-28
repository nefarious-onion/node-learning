const express = require('express');

const app = express();

app.use(express.static(__dirname + '/public'));

app.get('*', (req, res) => {
    res.status(405).end();
});

app.listen(8000, () => {
    console.log('Server started');
});