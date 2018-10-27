var request = require('request');
var credentials = require('./log-credentials');
var client_id = credentials.spotifyClientId; // Your client id
var client_secret = credentials.spotifySecretToken; // Your secret

var authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    headers: {
        'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
    },
    form: {
        grant_type: 'client_credentials'
    },
    json: true
};

module.exports = (args) =>{
    var paramsAccepted=  args.song  || args.s || args.track  || args.t; 
    request.post(authOptions, function(error, response, body) {
        if (!error && response.statusCode === 200) {
            // use the access token to access the Spotify Web API
            var baseUrl = 'https://api.spotify.com/v1/search?q=', encodedUrl = encodeURI(paramsAccepted), typeSearch = '&type=track', variableUrl = baseUrl + encodedUrl + typeSearch;
            var token = body.access_token;
            console.log(token);
            var options = {
            url: variableUrl,
            headers: {
                'Authorization': 'Bearer ' + token
            },
            json: true
            };

            request.get(options, function(error, response, body) {
                if (error) console.log(error);
                var id = body.tracks.items[0].id
                //console.log(body.tracks.items[0].id);
                //console.log(body.tracks.items[0].name);
                //console.log(body.tracks.items[0].duration_ms);
                //console.log(body.tracks.items[0].album.release_date);
                //console.log(body.tracks.items[0].album.id);
                
            });
        } else {console.log(error);}
    });
}