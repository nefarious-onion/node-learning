const express = require('express'),
	mongoose = require('mongoose'),
	app = express(),
	Rank = require('./models/Rank');

require('dotenv').config();

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.DB_CONNECTION,
	{
		useNewUrlParser: true,
		useUnifiedTopology: true
	},
	() => console.log('connected to database'));

var db = mongoose.connection;

db.on('error', function (err) {
	console.log('An error has occured while establishing connection with DB: ' + err);
});

db.on('open', function () {
	console.log('Connected to DB');
});

app
	.use(express.static(__dirname + '/public/'))
	.listen(PORT, () => console.log(`Listening on ${PORT}`));

app.get('/', function (req, res) {
	res.sendFile(__dirname + '/views/index.html');
});


app.post('/api/addRank/:username/:score', function (req, res) {
	Rank.findOne(
		{ username: req.params.username },
		function (err, record) {
			if (err) {
				console.error('Error while fetching from DB. ');
			}

			if (record !== null) {
				record.score = req.params.score;
				record.save()
					.then(function () {
						console.log('Update score for user ' + req.params.username);
						res.status(200).end();
					})
					.catch(function (err) {
						console.error(err.message);
						res.status(501).end();
					});
				return;
			}

			var newRank = new Rank();

			newRank.username = req.params.username;
			newRank.score = req.params.score;

			newRank.save()
				.then(function () {
					console.log('Saved new score');
					res.status(200).end();
				})
				.catch(function (err) {
					console.error(err.message);
					res.status(501).end();
				});
		}
	);
});

app.get('/api/wipe', function (req, res) {
	Rank.deleteMany({}, function (err, resp) {
		res.send('Wiped');
	});
});

app.get('/api/rank', function (req, res) {
	Rank.find({}, function (err, record) {
		if (err) {
			res.send('An error has occured while fetching Ranking table. ');
			return;
		}

		res.send(record);
	});
});