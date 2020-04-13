function renderImg(data){
    data.forEach(function(imgSrc){
        var imgEl = document.createElement('img');
        imgEl.src = imgSrc;
        document.getElementById('result').appendChild(imgEl);
    });
}

document.getElementById('search-btn').addEventListener('click', function(event){
    event.preventDefault();

    var searchTerm = document.getElementById('searchTerm').value,
        apiUrl = '/api/gif/' + searchTerm,
        opt = {
            method: 'POST'
        };

    fetch(apiUrl, opt)
        .then(function(resp){
            return resp.json();
        })
        .then(function(data){
            document.getElementById('result').innerHTML = '';

            renderImg(data.gifs);
            renderImg(data.stickers);
        })
        .catch(function(err){
            console.log('An error has occurred: ' + err);
        });
});