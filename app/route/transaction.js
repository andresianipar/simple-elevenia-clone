const config = require("../../config");
const { XMLParser } = require("fast-xml-parser");
const helper = require("../helper");
const { sequelize, transactionModel } = require("../database");

module.exports = (server) => {
  const xmlParser = new XMLParser();
  // Transaction routes
  //
  // Create transaction
  server.route({
    method: "POST",
    path: "/v1/transaction",
    handler: async (request, h) => {},
  });

  // List transaction
  server.route({
    method: "GET",
    path: "/v1/transactions",
    handler: async (request, h) => {},
  });

  // Show transaction
  server.route({
    method: "GET",
    path: "/v1/transaction/{transactionId}",
    handler: async (request, h) => {},
  });

  // Update transaction
  server.route({
    method: "PUT",
    path: "/v1/transaction/{transactionId}",
    handler: async (request, h) => {},
  });

  // Delete transaction
  server.route({
    method: "DELETE",
    path: "/v1/transaction/{transactionId}",
    handler: async (request, h) => {},
  });
};
