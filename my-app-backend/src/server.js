const express = require('express');
const app = express();
const PORT = process.env.PORT || 8000;

//set the filepath for express to find views-folder
app.set('views', './src/views');
app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public'));
console.log(__dirname);

app.get('/', (req, res) => {
    res.render('pages/index');
});



app.get('*', (req, res) => {
    res.send('This page does not exist');
});

app.listen(PORT, () => {
    console.log('Server started');
});