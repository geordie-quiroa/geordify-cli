var request = require('request'); // "Request" library

var client_id = 'your-clientID',client_secret = 'your-secret-token'; 

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
            console.log(token);
            var options = {
            url: 'https://api.spotify.com/v1/tracks/2TpxZ7JUBn3uw46aR7qd6V', //'https://api.spotify.com/v1/users/jmperezperez',
            headers: {
                'Authorization': 'Bearer ' + token
            },
            json: true
            };

            request.get(options, function(error, response, body) {
                if (error) console.log(error);
                console.log(body.artists[0].name);
            });
        } else {console.log(error);}
    });
}