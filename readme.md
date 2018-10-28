<img src="icon.png" align="right" />

# Geordify-CLI

> Esta app es una interfaz de comandos para consumir el api de spotify y consultar los albúmes de cualquier artista, sus canciones, las top 10 canciones más escuchadas de ese artista, así como crear una gráfica de barras horizontales de cada parámetro provisto por el API que tiene la canción consultada (danceability, energy, acousticness...). 

## Instalación
### Requerimientos
* Node JS
* NPM
* Línea de comandos (git bash)
* Cuenta de spotify
* Aplicación de spotify registrada
* Token Client Id provista por spotify
* Token secreto porvisto por spotify 

### Librerías utilizadas
* minimist
* spotify-web-api-node
* chalk

Clonar el repositorio

`$ git clone https://github.com/geordie-quiroa/geordify-cli.git`

O bien, descargar el release tag más reciente y acceder al directorio descargado

`$ cd geordify-cli`

Instalar el CLI como un paquete global

`$ npm install -g geordify-cli`

Linkear el archivo binario para poder correr la interfaz desde cualquier dierctorio bajo el comando `geordify`

 `$ npm link`

Agregar el `client id` y `secret key` en el archivo  `geordify-cli/cmds/log-credentials.js` para poder realizar las consultas al API

```javascript
module.exports = {
    spotifyClientId:'your-client-id',
    spotifySecretToken:'your-secret-token'
}
``` 

(guardar los cambios)

Ahora se puede escribir `geordify` en cualquier interfaz de comandos (yo utilicé git bash) para correr el CLI y mostrar los comandos y opciones disponibles

`$ geordify`

![](https://github.com/geordie-quiroa/geordify-cli/blob/master/geordifyHelp.png)
