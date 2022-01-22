const { v4: uuidv4 } = require("uuid");

module.exports = (db) => {
  const tableName = "product";

  return {
    create: async function create(
      { name, code, image, price, description, stock },
      transaction
    ) {
      return await db.sequelize.query(
        `INSERT INTO ${tableName}
         VALUES($id, $name, $code, $image, $price, $description, $stock)`,
        {
          bind: {
            id: uuidv4(),
            name: name,
            code: code,
            image: image,
            price: price,
            description: description,
            stock: stock,
          },
          type: db.Sequelize.QueryTypes.INSERT,
          transaction: transaction,
        }
      );
    },

    list: async function list(page = 1, perPage = 10) {
      const offset = (page - 1) * perPage;
      return await db.sequelize.query(
        `SELECT name, code, image, price, stock
         FROM ${tableName}
         LIMIT $perPage OFFSET $offset`,
        {
          bind: {
            perPage: perPage,
            offset: offset,
          },
          type: db.Sequelize.QueryTypes.SELECT,
        }
      );
    },

    show: async function show(productId) {
      return await db.sequelize.query(
        `SELECT * FROM ${tableName} WHERE id = $productId`,
        {
          bind: { productId: productId },
          type: db.Sequelize.QueryTypes.SELECT,
        }
      );
    },

    update: async function update(
      productId,
      { name, code, image, price, description },
      transaction
    ) {
      return await db.sequelize.query(
        `UPDATE ${tableName}
         SET name=$name, code=$code, image=$image, price=$price, description=$description
         WHERE id = $productId`,
        {
          bind: {
            productId: productId,
            name: name,
            code: code,
            image: image,
            price: price,
            description: description,
          },
          type: db.Sequelize.QueryTypes.UPDATE,
          transaction: transaction,
        }
      );
    },

    deleteAll: async function deleteAll(transaction) {
      return await db.sequelize.query(
        `DELETE FROM ${tableName}`,
        {
          type: db.Sequelize.QueryTypes.DELETE,
          transaction: transaction,
        }
      );
    },

    deleteOne: async function deleteOne(productId, transaction) {
      return await db.sequelize.query(
        `DELETE FROM ${tableName} WHERE id = $productId`,
        {
          bind: { productId: productId },
          type: db.Sequelize.QueryTypes.DELETE,
          transaction: transaction,
        }
      );
    },
  };
};
