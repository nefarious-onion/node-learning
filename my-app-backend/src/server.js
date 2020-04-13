const express = require('express');
const http = require('http');
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

const fetchEventsData = (lang, summary) => {
    const apiUrl = 'http://open-api.myhelsinki.fi/v1/activities/';
    const url = (lang !== null) ? apiUrl + '?language_filter=' + lang : apiUrl;
    console.log(url);

    return new Promise((resolve, reject) => {
        http.get(url, resp => {
            let data = '';

            resp.on('data', chunk => {
                // collect all data to data
                data += chunk;
            })

            // parse data when http request completed
            resp.on('end', () => {
                console.log('end of data received');
                // console.log("data", data.toString());
                // console.log("response", resp);
                const json = JSON.parse(data.toString());
                console.log("data", json);

                if (data === '') {
                    resolve(new Array());
                } else {
                    // const events = json
                    //     .filter(event => )
                    //     .map(event => );
                    let final = [];
                    resp.data.forEach(event => {
                        if (event.info_url && event.name[lang]) {
                            final.push({
                                url: event.info_url,
                                name: event.name[lang]
                            })
                        }
                    })
                    // resolve(final);
                    resolve(events);
                }
            })
        })
            .on('error', err => {
                console.log(err)
                reject(err);
            });
    });
}

app.get('/api/allevents/:lang', (req, res) => {
    fetchEventsData(req.params.lang)
        .then(data => {
            res.send.data;
        })
        .catch(err => {
            res.send(err);
        });
});


app.get('*', (req, res) => {
    res.send('This page does not exist');
});

app.listen(PORT, () => {
    console.log('Server started');
});