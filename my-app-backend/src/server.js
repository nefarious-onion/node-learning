const express = require('express');

const app = express();

app.use(express.static(__dirname + '/public'));

app.get('/vote', (req, res) => {
    res.send('GET request success');
});
app.post('/vote', (req, res) => {
    res.send('POST request success');
});
app.put('/vote/:voteId', (req, res) => {
    res.send('PUT request success for voteID of ' + req.params.voteId);
});
app.delete('/vote/:voteId', (req, res) => {
    res.send('Vote with ID of ' + req.params.voteId + ' has now been deleted');
});
app.get('*', (req, res) => {
    res.status(405).end();
});

app.listen(8000, () => {
    console.log('Server started');
});