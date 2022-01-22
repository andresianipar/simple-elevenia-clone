"use strict";

const config = require("../config");
const { sequelize } = require("./database");
const server = require("./server");

async function main() {
  try {
    await sequelize.authenticate();
  } catch (error) {
    helper.log(
      `${config.baseLogPath}/errors.txt`,
      `unable to connect to the database:\n
      ${error}`
    );
  }

  await server.start();
  console.log("Server running on %s", server.info.uri);
}

main();

process.on("unhandledRejection", async (err) => {
  helper.log(
    `${config.baseLogPath}/errors.txt`,
    `the 'unhandledRejection' event is emitted, error:\n
    ${error}`
  );

  await sequelize.close();
  process.exit(1);
});
