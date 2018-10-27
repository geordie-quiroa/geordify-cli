var request = require('request');
var credentials = require('./log-credentials');
var client_id = credentials.spotifyClientId; // Your client id
var client_secret = credentials.spotifySecretToken; // Your secret
var chalk = require('chalk');
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
            //console.log(token);
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
                getAudioFeatures(id, token);

            });
        } else {console.log(error);}
    });
    var getAudioFeatures = (trackId, token)=>{
        var options4audioFeatures = {
            url: "https://api.spotify.com/v1/audio-features/"+trackId,
            headers: {
                'Authorization': 'Bearer ' + token
            },
            json: true
            };
        request.get(options4audioFeatures, function(error, response, body) {
            if (error) console.log(error);
            console.log(body);
            readDictionary(body);
        });
    }
    var readDictionary = (dict)=>{
        var danceability = dict.danceability, energy = dict.energy, speechiness = dict.speechiness, acousticness = dict.acousticness, 
        instrumentalness = dict.instrumentalness, valence = dict.valence;
        var unidad = '          ';
        var decimales = ' ';
        var danceDec = danceability*10, energDec = energy*10, speechDec = speechiness*10, acoustDec = acousticness*10, instruDec = instrumentalness*10,
        valDec = valence*10;
        var dance = unidad.repeat((danceDec))+decimales.repeat(((danceDec)%1)*10), ener = unidad.repeat(energDec)+decimales.repeat((energDec%1)*10),
        speech = unidad.repeat(speechDec)+decimales.repeat(((speechDec)%1)*10),
        acoust =  unidad.repeat(acoustDec)+decimales.repeat(((acoustDec)%1)*10), instrum = unidad.repeat(instruDec)+decimales.repeat(((instruDec)%1)*10),
        val = unidad.repeat(valDec)+decimales.repeat(((valDec)%1)*10);
        console.log(`
    ${chalk.bgWhite('                                ')}${chalk.cyan(' Graphic for ', chalk.yellow(paramsAccepted))} ${chalk.bgWhite('                                ')}

    `)
        console.log(`             danceablity | ${chalk.bgYellow(dance)} ${chalk.yellow(danceability)}
     
                  energy | ${chalk.bgYellow(ener)} ${chalk.yellow(energy)} 
     
             speechiness | ${chalk.bgYellow(speech)} ${chalk.yellow(speechiness)}

            acousticness | ${chalk.bgYellow(acoust)} ${chalk.yellow(acousticness)}
        
        instrumentallnes | ${chalk.bgYellow(instrum)} ${chalk.yellow(instrumentalness)}

                 valence | ${chalk.bgYellow(val)} ${chalk.yellow(valence)}
     `)
    }
}