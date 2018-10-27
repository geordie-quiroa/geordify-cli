var SpotifyWebApi = require('spotify-web-api-node');
var request = require('request');
var credentials = require('./log-credentials');
var client_id = credentials.spotifyClientId; // Your client id
var client_secret = credentials.spotifySecretToken; // Your secret
var chalk = require('chalk');
// credentials are optional
var spotifyApi = new SpotifyWebApi({
  clientId: client_id,
  clientSecret: client_secret,
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
    var paramsAccepted=  args.band  || args.b || args.artist  || args.a || args.singer ||args.s; 
    request.post(authOptions, function(error, response, body) {
        if (!(args.t || args.top)){    
            if (!error && response.statusCode === 200) {
                var baseUrl = 'https://api.spotify.com/v1/search?q=', encodedUrl = encodeURI(paramsAccepted), typeSearch = '&type=artist', variableUrl = baseUrl + encodedUrl + typeSearch;
                // use the access token to access the Spotify Web API
                var token = body.access_token;
                spotifyApi.setAccessToken(token);
                //console.log(token);
                searchTracks();
                
            } else{
                console.log(error);
            }
        } else if ((args.t || args.top) == true){
            if (!error && response.statusCode === 200) {
                var baseUrl = 'https://api.spotify.com/v1/search?q=', encodedUrl = encodeURI(paramsAccepted), typeSearch = '&type=artist', variableUrl = baseUrl + encodedUrl + typeSearch;
                // use the access token to access the Spotify Web API
                var token = body.access_token;
                spotifyApi.setAccessToken(token);
                //console.log(token);
            
                var options = {
                    url: variableUrl, // encuentra el ID del artista/banda
                    headers: {
                        'Authorization': 'Bearer ' + token
                    },
                    json: true
                    };
        
                request.get(options, function(error, response, body) {
                    if (error) console.log(error);
                    var id = body.artists.items[0].id; // ID del artista
                    //getAlbums(id, token, paramsAccepted);
                    searchTop(id, token);
                });
            } else{
                console.log(error);
            }
        }
    });
    var searchTop = (artistId, access_token)=>{
        var baseUrl= 'https://api.spotify.com/v1/artists/', endpoint = '/top-tracks', qcountry = '?country=', country = args.country || 'US',  variableUrl = baseUrl+artistId+endpoint+qcountry+country;
        var options = {
            url: variableUrl, //'https://api.spotify.com/v1/users/jmperezperez',
            headers: {
                'Authorization': 'Bearer ' + access_token
            },
            json: true
            };

            request.get(options, function(error, response, body) {
                if (error) console.log(error);
                var tracks = body.tracks; // top tracks del artista
                //console.log(body.tracks)
                cleanTopTracks(tracks, country);

            });
    }
    var cleanTopTracks = (array, country)=>{
        var long = array.length;
        console.log(`   ${chalk.bgWhite('                                                                                                        ')}`)
        console.log('  ',  chalk.bgWhite('  '),chalk.hex('#DEADED').bold(' --------------------------------- '), chalk.yellow.bold(paramsAccepted+'`s'),chalk.hex('#DEADED').bold(' Top Ten in ',chalk.yellow.bold(country) ,'-------------------------------'));
        console.log(' ')
        for (var i = 0; i < long; i++) {
            var song = array[i].name;
            console.log(`                               ${chalk.yellow.bold(i+1, ' -')}  ${chalk.hex('#DEADED').bold(song)}`);
        };
        console.log(`   ${chalk.bgWhite('  ')}                                                                                                    ${chalk.bgWhite('  ')}`);
        console.log(`   ${chalk.bgWhite('                                                                                                        ')}`)
    }

    var searchTracks = ()=>{
        var queryKey = 'artist:', queryValue = paramsAccepted, query = queryKey + queryValue; 
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
        console.log(`   ${chalk.bgWhite('                                                                                                        ')}`)
        console.log('  ',  chalk.bgWhite('  '),chalk.hex('#DEADED').bold('     ----------------------------------- '), chalk.yellow.bold(artist+'`s'),chalk.hex('#DEADED').bold(' Songs --------------------------------- '));
        console.log(' ')
        for (var i = 0; i < long; i++) {
            console.log(chalk.yellow.bold('                    - '),chalk.hex('#DEADED').bold(array2read[i].name));
        }
        console.log(`   ${chalk.bgWhite('  ')}                                                                                                    ${chalk.bgWhite('  ')}`);
        console.log(`   ${chalk.bgWhite('                                                                                                        ')}`)
    }
}