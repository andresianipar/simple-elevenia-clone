"use strict";

const Sequelize = require("sequelize");
const env = process.env.NODE_ENV || "development";

let sequelize;
if (env === "production") {
  sequelize = new Sequelize(
    process.env.POSTGRES_DB,
    process.env.POSTGRES_USER,
    process.env.POSTGRES_PASSWORD,
    {
      dialect: process.env.POSTGRES_DIALECT,
      host: process.env.POSTGRES_HOST,
      port: process.env.POSTGRES_PORT,
      logging: false,
    }
  );
} else {
  const config = require(__dirname + "/../../config/sequelize.json")[env];
  sequelize = new Sequelize(config.database, config.username, config.password, {
    ...config,
    logging: console.log,
  });
}

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

const productModel = require("./models/product");
const transactionModel = require("./models/transaction");
db.productModel = productModel(db);
db.transactionModel = transactionModel(db);

module.exports = db;
