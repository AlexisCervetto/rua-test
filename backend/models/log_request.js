module.exports = (sequelize, type) => {
    return sequelize.define('log_request', {
        id:{
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        ip: type.STRING,
        artistName: type.STRING,
    });
}