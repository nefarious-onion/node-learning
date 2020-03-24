const express = require('express');

var app = express();

app.get('/hello', function(req, res){
    res.send('hello there');
});
app.get('/contact', function(req, res){
    res.send('this is a contact page');
});
app.get('/resume', function(req, res){
    res.send('hello, this is resume page');
});
app.get('/ab(c)?d', function(req, res){
    res.send('ab(c)?d');
});
app.get('/ab*cd', function(req, res){
    res.send('ab*cd');
});
app.get('/ab*cd', function(req, res){
    res.send('ab*cd');
});

app.listen(8000, function(){
    console.log('Server started');
});