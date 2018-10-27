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

//spotifyApi.setAccessToken('BQCvT2kB_sS402TVFmkmOIL80PRWAyPy1UapgSZz_W0H5EDym6nFb8FecSkOAMRvnEFBAP6qzV1suCCplIw');

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

module.exports = (args) => {   
    request.post(authOptions, function(error, response, body) {
        if (!error && response.statusCode === 200) {
            // use the access token to access the Spotify Web API
            var token = body.access_token;
            spotifyApi.setAccessToken(token);
            //console.log(token);
            searchTracks();
        } else{
            console.log(error);
        }
    });

    var searchTracks = ()=>{
        var queryKey = 'artist:', queryValue = args.singer || args.band || args.s || args.b, query = queryKey + queryValue; 
        spotifyApi.searchTracks(query)
        .then(function(data) {
            var arraySongs = data.body.tracks.items;
            getSongs(arraySongs, queryValue);
        }, function(err) {
            console.log('Something went wrong!', err);
        });
    };
    var getSongs = (array2read, artist)=>{
        var long  = array2read.length;
        console.log('-------- '+ artist+'`s Songs ------------');
        for (var i = 0; i < long; i++) {
            console.log(' - ',array2read[i].name);
        }
    }
}