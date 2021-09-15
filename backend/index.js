const express = require("express");

const app = express();

require("./db");

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routers
const apiRouter = require("./routes/api");

// Estructurado de rutas, si viene /api va para el manejador de rutas /api
app.use("/api", apiRouter);

app.listen(3000, () => {
    console.log("server on");
});