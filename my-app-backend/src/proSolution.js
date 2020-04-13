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

const fetchActivities = (lang) => {
    const apiUrl = 'http://open-api.myhelsinki.fi/v1/activities/';
    const url = (lang !== null)
        ? apiUrl + '?language_filter=' + lang
        : apiUrl;

    return new Promise((resolve, reject) => {
        http.get(url, resp => {
            let data = '';

            resp.on('data', chunk => {
                data += chunk;
            })

            resp.on('end', () => {
                const hasData = data !== "";

                if (hasData) {
                    resolve([]);
                } else {
                    const activities = JSON.parse(data.toString());
                    resolve(activities);
                }
            })
        })
            .on('error', err => {
                console.log(err)
                reject(err);
            });
    });
}

const fetchEventsData = (lang, summary) => {
    return fetchActivities(lang)
        .then(activities => activities.data)
        .then(events => events.filter(event => event.info_url && event.name && event.name[lang]))
        .then(events => events.map(event => ({
            url: event.info_url,
            name: event.name[lang]
        })))
}

app.get('/api/allevents/:lang', (req, res) => {
    fetchEventsData(req.params.lang)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.send(err);
        });
});

app.get('/api/allevents/:lang', async (req, res) => {
    try {
        const events = await fetchEventsData(req.params.lang)
        res.send(events);
    } catch (error) {
        res.send(error);
    }
});


// app.get('*', (req, res) => {
//     res.send('This page does not exist');
// });

// app.listen(PORT, () => {
//     console.log('Server started');
// });