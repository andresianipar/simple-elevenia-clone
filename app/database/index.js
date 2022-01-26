"use strict";

const Sequelize = require("sequelize");
const env = process.env.NODE_ENV || "development";

let sequelize;
if (env === "production") {
  sequelize = new Sequelize(process.env.POSTGRES_URI, {
    dialect: "postgres",
    logging: false,
  });
} else {
  const config = require(__dirname + "/../../config/sequelize.json")[env];
  sequelize = new Sequelize(config.uri, {
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
