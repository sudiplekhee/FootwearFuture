const { Sequelize, DataTypes } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize({
    database: process.env.db_name,
    host: process.env.db_host,
    password: process.env.db_password,
    username: process.env.db_username,
    port: process.env.db_port,
    dialect: "mysql"
});

sequelize.authenticate()
    .then(() => {
        console.log("Connected successfully");
    })
    .catch((err) => {
        console.log("Not connected successfully", err);
    });

const db = {};
db.sequelize = sequelize; // ✅ include sequelize instance
db.users = require("../models/userModel")(sequelize, DataTypes);
db.registerusers = require("../models/registerModeL")(sequelize, DataTypes);


sequelize.sync({ alter: true })
    .then(() => {
        console.log("Migrated successfully");
    });

module.exports = db; // ✅ export complete db object
