var SpotifyWebApi = require('spotify-web-api-node'),request = require('request'),credentials = require('./log-credentials'),client_id = credentials.spotifyClientId,client_secret = credentials.spotifySecretToken,chalk = require('chalk');
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
    request.post(authOptions, function(error, response, body) {
        if (!error && response.statusCode === 200) {
            var baseUrl = 'https://api.spotify.com/v1/search?q=', decodedUrl= args.singer || args.band || args.artist || args.a || args.b || args.group, encodedUrl = encodeURI(decodedUrl), typeSearch = '&type=artist', variableUrl = baseUrl + encodedUrl + typeSearch;
            //console.log(decodedUrl);
            // use the access token to access the Spotify Web API
            var token = body.access_token;
            //console.log(token);
            var options = {
            url: variableUrl, //'https://api.spotify.com/v1/users/jmperezperez',
            headers: {
                'Authorization': 'Bearer ' + token
            },
            json: true
            };

            request.get(options, function(error, response, body) {
                if (error) console.log(error);
                var id = body.artists.items[0].id; // ID del artista
                getAlbums(id, token, decodedUrl);

            });
        } else {console.log(error);}
    });

    var getAlbums = (artistId, accessToken, artistName)=>{
        spotifyApi.setAccessToken(accessToken);
        spotifyApi.getArtistAlbums(artistId)
            .then(function(data) {
                var albums = data.body.items
                //console.log('Artist albums', albums);
                readAlbums(albums, artistName);
            }, function(err) {
                console.error(err);
            });
    }

    var readAlbums = (array2read, artistName) =>{
        var long = array2read.length;
        console.log(`   ${chalk.bgWhite('                                                                                                        ')}`)
        console.log('  ',  chalk.bgWhite('  '),chalk.hex('#DEADED').bold(' -------------------------------------- '), chalk.yellow.bold(artistName+'`s'),chalk.hex('#DEADED').bold(' Albums ---------------------------------- '));
        console.log(' ');
        for (var i = 0; i < long; i++) {
            console.log(`                               ${chalk.yellow.bold(' -')}  ${chalk.hex('#DEADED').bold(array2read[i].name)}`);
        }
        console.log(`   ${chalk.bgWhite('  ')}                                                                                                    ${chalk.bgWhite('  ')}`);
        console.log(`   ${chalk.bgWhite('                                                                                            ',chalk.bgWhite.black('Geordify'),'  ')}`)
    }
}