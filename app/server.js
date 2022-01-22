const config = require("../config");
const Hapi = require("@hapi/hapi");
const { productRoute, transactionRoute } = require("./route");

const server = Hapi.server({
  host: config.server.host,
  port: config.server.port,
});

productRoute(server);
transactionRoute(server);

// Default routes
server.route({
  method: "*",
  path: "/{any*}",
  handler: (request, h) => {
    return h.response("Page not found.").code(404);
  },
});

module.exports = server;
