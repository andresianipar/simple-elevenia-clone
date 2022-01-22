module.exports = (db) => {
  const tableName = "transaction";

  return {
    list: async function create(args) {
      return await db.sequelize.query(`SELECT * FROM ${tableName}`, {
        type: db.Sequelize.QueryTypes.SELECT,
      });
    },
  };
};
