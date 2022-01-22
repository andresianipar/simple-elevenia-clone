"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("transaction", {
      id: {
        type: Sequelize.DataTypes.UUID,
        primaryKey: true,
      },
      productCode: {
        type: Sequelize.DataTypes.STRING,
        references: {
          model: {
            tableName: "product",
            schema: "public",
          },
          key: "code",
        },
        allowNull: false,
      },
      quantity: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
      },
      amount: {
        type: Sequelize.DataTypes.DECIMAL,
        allowNull: false,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("transaction");
  },
};
