function renderRank(data) {
    data.forEach(function (rankData) {
        var rankEl = document.createElement('li');
        rankEl.innerText = rankData.username + ': ' + rankData.score;
        document.getElementById('rank').appendChild(rankEl);
    });
}


var apiUrl = '/api/rank';

fetch(apiUrl)
    .then(function (resp) {
        return resp.json();
    })
    .then(function (data) {
        renderRank(data);
    })
    .catch(function (err) {
        console.log('An error has occurred: ' + err);
    });