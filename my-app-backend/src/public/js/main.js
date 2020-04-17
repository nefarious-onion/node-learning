function renderImg(data) {
    data.forEach(function (imgSrc) {
        var imgEl = document.createElement('img');
        imgEl.src = imgSrc;
        document.getElementById('result').appendChild(imgEl);
    });
}

document.getElementById('search-btn').addEventListener('click', function (event) {
    event.preventDefault();

    var searchTerm = document.getElementById('searchTerm').value,
        apiUrl = 'http://localhost:5000/api/gif/' + searchTerm,
        opt = {
            method: 'GET',
            redirect: 'follow',
        };
    console.log('searchterm is', searchTerm);
    console.log('url is', apiUrl, opt);

    fetch(apiUrl, opt)
        .then(function (resp) {
            console.log("resp", resp);
            return resp.json();

        })
        .then(function (data) {
            console.log("data", data);
            document.getElementById('result').innerHTML = '';

            renderImg(data.gifs);
            renderImg(data.stickers);
        })
        .catch(function (err) {
            console.log('An error has occurred: ' + err);
        });
});