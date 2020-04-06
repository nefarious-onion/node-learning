const fs = require('fs');

function sayTwo() {
    fs.readFile(__dirname ? '/data.json', function(err, data) {
        console.log('two');
        sayThree();
    });
}

function say() {
    console.log('one');
    sayTwo();
    console.log('three');
}

function sayThree() {
    console.log('three');
}

say();