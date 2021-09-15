1- Correr primero el back para que arme las tablas sequelize (carpeta /backend)
2- Configurar las credenciales de su DB en el archivo /backend/db.js
3- Configurar credenciales para conexion al API de Spotify en el archivo /backend/routes/config/constants.js
3- Levantar front y queda funcionando.

Notas importantes: 

Hay que cambiar el puerto del proyecto de react, por ende hay que tocar el package.json dependiendo el SO en el que estes ejecutando el proyecto. 
Dejar siempre el 3003, dado a que esta apuntando ahi el callback del api de Spotify, sino no te va a funcionar nada.

Leer: https://stackoverflow.com/questions/40714583/how-to-specify-a-port-to-run-a-create-react-app-based-project