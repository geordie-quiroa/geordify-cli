var SpotifyWebApi = require('spotify-web-api-node');
var request = require('request');
var client_id = '38e377baa81747a68c4cb3677646cc16'; // Your client id
var client_secret = '87c0344055ab4e7cabc6924c12e245bf'; // Your secre
// credentials are optional
var spotifyApi = new SpotifyWebApi({
  clientId: '38e377baa81747a68c4cb3677646cc16',
  clientSecret: '87c0344055ab4e7cabc6924c12e245bf',
  redirectUri: 'http://www.example.com/callback'
});
spotifyApi.setAccessToken('BQCvT2kB_sS402TVFmkmOIL80PRWAyPy1UapgSZz_W0H5EDym6nFb8FecSkOAMRvnEFBAP6qzV1suCCplIw');

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
        //console.log(token);
        var options = {
        url: 'https://api.spotify.com/v1/search?q=tania%20bowra&type=artist', //'https://api.spotify.com/v1/users/jmperezperez',
        headers: {
            'Authorization': 'Bearer ' + token
        },
        json: true
        };

        request.get(options, function(error, response, body) {
            if (error) console.log(error);
            var data = body.artists.items[0].id;
            getAlbums(data);

        });
    } else {console.log(error);}
});

var getAlbums = (artistId)=>{
    spotifyApi.getArtistAlbums(artistId)
        .then(function(data) {
            var albums = data.body.items
            console.log('Artist albums', albums);
            readAlbums(albums);
        }, function(err) {
            console.error(err);
        });
}

var readAlbums = (array2read) =>{
    var long = array2read.length;
    
    console.log(long);
}