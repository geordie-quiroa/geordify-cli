<img src="icon.png" align="right" />

# Geordify-CLI

> This is a Spotify CLI (command line interface) for consulting artist's albums, songs, top 10 songs and displaying a horizontal graph bar with any song's characteristics (danceability, energy, acousticness...) provided by the spotify's web api. 

## Installation
### Requirements
* Node JS
* NPM
* A command prompt
* Spotify Account
* Spotify's Registered Application
* Spotify's Client ID token
* Spotify's Secret Token 

### Libraries Used
* minimist
* spotify-web-api-node
* chalk

Clone this repo

`$ git clone https://github.com/geordie-quiroa/geordify-cli.git`

Or download the most recent release tag and open the dir downloaded.

`$ cd geordify-cli`

Install the cli as a global package

`$ npm install -g geordify-cli`

Link the binary so you can access to it from any dir

 `$ npm link`

Add your Spotify's `client id` and `secret key` in  `geordify-cli/cmds/log-credentials.js`

```javascript
module.exports = {
    spotifyClientId:'your-client-id',
    spotifySecretToken:'your-secret-token'
}
``` 

(save the file)

Now you can type `geordify` to display all the commands available and their options.

`$ geordify`

![](https://github.com/geordie-quiroa/geordify-cli/blob/master/geordifyHelp.png)
