const express = require('express');
const PORT = process.env.PORT || 5000;
const fetch = require('node-fetch');
const app = express();

app.use(express.json());

function handleJSON(json) {
	if (!json.data) {
		return;
	}

	var result = [],
		counter = json.data.length;

	while (counter--) {
		try {
			result.push(json.data[counter].images.original.url);
		} catch {
			console.log('An error has occurred while processing GIHPY response');
		}
	}

	return result;
}

function buildUrl(endpoint, params) {
	return endpoint + '?api_key=' + params.apiKey + '&q=' + params.searchTerm;
}

function fetchGif(apiUrl) {
	return fetch(apiUrl)
		.then(function (resp) {
			return resp.json();
		})
		.then(function (json) {
			var formattedData = handleJSON(json);
			return formattedData;
		})
		.catch(function (err) {
			res.send('An error has occurred (fetchGif): ' + err);
		});
}

app
	.use(express.static(__dirname + '/public/'))
	.listen(PORT, () => console.log(`Listening on ${PORT}`));

app.get('/', function (req, res) {
	res.sendFile(__dirname + '/views/pages/search.html');
});

app.get('/api/gif/:searchTerm', function (req, res) {
	res.header("Access-Control-Allow-Origin", "http://localhost:5500");

	var gifEndPoint = 'http://api.giphy.com/v1/gifs/search',
		stickerEndPoint = 'http://api.giphy.com/v1/stickers/search',
		params = {
			apiKey: 'Knrw4IfKgD4zDGufUauNH0qGBdFwqfzb',
			searchTerm: req.params.searchTerm
		},
		gifEndPointUrl = buildUrl(gifEndPoint, params),
		stickerEndPointUrl = buildUrl(stickerEndPoint, params),
		promises = [fetchGif(gifEndPointUrl), fetchGif(stickerEndPointUrl)];

	Promise.all(promises)
		.then(function (resp) {
		
			res.send({
				gifs: resp[0],
				stickers: resp[1]
			});
		})
		.catch(function (err) {
			res.send('An Error has occured: ' + err);
		});
});