const express = require('express');

const app = express();
//set the filepath for express to find views-folder
app.set('views', './src/views');
app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    res.render('pages/index');
});

// app.get('*', (req, res) => {
//     res.status(405).end();
// });

app.listen(8000, () => {
    console.log('Server started');
});