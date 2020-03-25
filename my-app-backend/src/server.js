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
// app.get('/ab(c)?d', function(req, res){
//     res.send('ab(c)?d');
// });
// app.get('/ab*cd', function(req, res){
//     res.send('ab*cd');
// });
// app.get('/ab*cd', function(req, res){
//     res.send('ab*cd');
// });

// app.get('/products/:gender/:category:campaing', function(rer, res) {
//     res.send('You are ordering products for '
//     + req.params.gender
//     + ' with the product gategory of '
//     + req.params.params.category
//     + ' and you want discount for '
//     + req.params.campaign
//     );
// })

//domain.com/api/game/flappybird/upvote
//domain.com/api/game/flappybird/downvote
let score = 0;

app.get('/api/game/:gameName/:vote', function(req, res) {
    if (req.params.vote === 'upvote') {
        console.log('upvote req', score);
        score++;
        res.send('you have just upvoted ' + req.params.gameName + ' to ' + score );
    } else if (req.params.vote === 'downvote') {
        console.log('downvote req', score);
        //score = (score === 0) ? score : score--;
        //score = Math.max(0, score -1);
        // if ( score === 0) {
        //     score = 0;
        // } else {
        //     score--;
        // }
        if (score > 0) {
            score--
        };
        res.send('you have just downvoted ' + req.params.gameName + ' to ' + score );
    } else {
        res.send('Request invalid');
    }
});

app.listen(8000, () => {
    console.log('Server started');
});