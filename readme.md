<img src="icon.png" align="right" />

# Geordify-CLI

> Esta app es una interfaz de comandos para consumir el api de spotify y consultar los álbumes de cualquier artista, sus canciones, las top 10 canciones más escuchadas de ese artista, así como crear una gráfica de barras horizontales de cada parámetro provisto por el API que tiene la canción consultada (danceability, energy, acousticness...). 

## Instalación
### Requerimientos
* Node JS
* NPM
* Línea de comandos (git bash)
* Cuenta de spotify (developer)
* Aplicación de spotify registrada
* Token Client Id provisto por spotify
* Token secreto provisto por spotify 

### Librerías utilizadas
* minimist
* spotify-web-api-node
* chalk
* request

Clonar el repositorio

`$ git clone https://github.com/geordie-quiroa/geordify-cli.git`

O bien, descargar el release tag más reciente y acceder al directorio descargado

`$ cd geordify-cli`

Instalar las librerías y dependencias en el package.json

`$ npm install`

Instalar el CLI como un paquete global

`$ npm install -g geordify-cli`

Linkear el archivo binario para poder correr la interfaz desde cualquier dierctorio bajo el comando `geordify`

 `$ npm link geordify-cli`

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

## Ejemplos de uso

`$ geordify graphic <options> "song name" <flag>` Muestra una gráfica de barras horizontales en base a los parámetros que regresa el API con el significado en base a la documentación de Spotify.

![](https://github.com/geordie-quiroa/geordify-cli/blob/master/exampleGraphicWithFlag.png)

`$ geordify graphic <options> "song name" <optional flag>` Muestra una gráfica de barras horizontales en base a los parámetros que regresa el API.

![](https://github.com/geordie-quiroa/geordify-cli/blob/master/exampleGraphicNoFlag.png)

`$ geordify albums <options> "artist/band name"` Despliega los álbumes del grupo/artista consultado.

![](https://github.com/geordie-quiroa/geordify-cli/blob/master/geordifyAlbumsExample.png)

`$ geordify albums <options> "artist/band name" --count` Despliega el total de álbumes que tiene grupo/artista consultado.

![](https://github.com/geordie-quiroa/geordify-cli/blob/master/exampleAlbumsCount.png)

`$ geordify songs <options> "artist/band name" <optional flags>` Muestra las canciones del artista/banda consultada sin flags.

![](https://github.com/geordie-quiroa/geordify-cli/blob/master/geordifySongsNoFlags.png)

`$ geordify songs <options> "artist/band name" <flag>` Muestra las top 10 canciones más escuchadas del artista/banda consultada para el país definido en el comando.

![](https://github.com/geordie-quiroa/geordify-cli/blob/master/geordifySongsWithFlags.png)

## Authors

* **Geordie Quiroa** - [github](https://github.com/geordie-quiroa)
