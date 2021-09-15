const Sequelize = require("sequelize");

const LogRequestModel = require("./models/log_request");

// Cambiar a gusto
const dbname = "rua_test";
const dbuser = "root";
const dbpass = "";
const dbhost = "localhost";
const dbtype = "mysql";

const sequelize  = new Sequelize(dbname, dbuser, dbpass, {
    host: dbhost,
    dialect: dbtype
})

const LogRequest = LogRequestModel(sequelize, Sequelize);

sequelize.sync({ force:false }).then(() => {
    console.log("tablas sincro");
});

module.exports = {
    LogRequest
}