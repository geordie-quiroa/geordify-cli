var request = require('request'); // "Request" library

var client_id = '38e377baa81747a68c4cb3677646cc16'; // Your client id
var client_secret = '87c0344055ab4e7cabc6924c12e245bf'; // Your secret

// your application requests authorization
module.exports = (args) =>{
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

    request.post(authOptions, function(error, response, body) {
    if (!error && response.statusCode === 200) {

        // use the access token to access the Spotify Web API
        var token = body.access_token;
        var options = {
        url: 'https://api.spotify.com/v1/users/jmperezperez',
        headers: {
            'Authorization': 'Bearer ' + token
        },
        json: true
        };
        request.get(options, function(error, response, body) {
        console.log(body.id);
        });
    }
    });
}