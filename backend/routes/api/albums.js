const router = require("express").Router();

var SpotifyWebApi = require('spotify-web-api-node');
var constants = require("../config/constants");

var spotifyApi = new SpotifyWebApi({
  clientId: constants.CLIENT_ID,
  clientSecret: constants.CLIENT_SECTET,
  redirectUri: constants.REDIRECT_URI
});

router.post("/search", async (req, res) => {
    const { token, artistName } = req.body;
    spotifyApi.setAccessToken(token);

    let artistData = {};
    let listAlbums = [];
    let response = [];

    await spotifyApi.search(artistName, ["artist"]).then(
        (data) => {
            const items = data.body.artists.items;
            const artist = (items.length > 0) ? items[0] : items;
            artistData.name = artist.name;
            artistData.id = artist.id;
        },
        (err) => {
            res.send(JSON.stringify(err.body.error));
        }
    );

    await spotifyApi.getArtistAlbums(artistData.id).then(
        (data) => {
            const items = data.body.items;
            /*
            *   Segun el api no permite concatenar mas de 20 ids en la consulta de albums 
            *   Fuente: https://developer.spotify.com/documentation/web-api/reference/#endpoint-get-multiple-albums
            */
            if(items.length <= 20){
                items.forEach(element => {
                    listAlbums.push(element.id);
                });
            }
        },
        (err) => {
            res.send(JSON.stringify(err.body.error));
        }
    );
    
    await spotifyApi.getAlbums(listAlbums).then(
        (data) => {
            const albums = data.body.albums;

            albums.forEach(element => {
                response.push(
                    {
                        name: element.name,
                        release_date: element.release_date,
                        popularity: element.popularity
                    }
                );
            });
        },
        (err) => {
            res.send(JSON.stringify(err.body.error));
        }
    );
    
    // Insercion en la db del log de la busqueda.
    const { LogRequest } = require("../../db");
    // Desde postman siempre queda el valor de req.ip en ::1, vi que hay librerias para tomar la ip real del cliente, pero no quise sobrecargar el proyecto
    // La otra opcion es enviarlo en el header y listo.
    const ip = req.headers['x-forwarded-for'] || req.ip;
    await LogRequest.create({ ip, artistName });

    res.send(JSON.stringify(response));
    
});

module.exports = router;