const config = require("../../config");
const { XMLParser } = require("fast-xml-parser");
const httpClient = require("../http/client");
const helper = require("../helper");
const { sequelize, productModel } = require("../database");

module.exports = (server) => {
  const xmlParser = new XMLParser();

  // Product routes
  //
  // Pull initial product data
  server.route({
    method: "GET",
    path: "/v1/pull-initial-products",
    handler: async (request, h) => {
      const transaction = await sequelize.transaction();
      const productCodes = new Map();
      let hasMoreProducts = true;
      let pageNumber = 1;
      let promises = [productModel.deleteAll(transaction)];

      while (hasMoreProducts) {
        let response = {};
        try {
          let url = `/prodservices/product/listing?page=${pageNumber}`;
          response = await httpClient.request({
            url: url,
            method: "GET",
          });
        } catch (error) {
          const errorMessage = `Failed to pull product data:\n${helper.parseError(
            error
          )}`;
          helper.log(`${config.baseLogPath}/errors.txt`, errorMessage);
          continue;
        }

        if (response.status === 200) {
          const parsedData = xmlParser.parse(response.data);
          if (parsedData.Products === "") {
            hasMoreProducts = false;
            continue;
          }

          const products = parsedData.Products.product;
          for (let i = 0; i < products.length; i++) {
            if (productCodes.get(products[i].sellerPrdCd)) {
              continue;
            }
            productCodes.set(products[i].sellerPrdCd, true);

            promises.push(
              productModel.create(
                {
                  name: products[i].prdNm,
                  code: products[i].sellerPrdCd,
                  image: "",
                  price: products[i].selPrc,
                  description: "",
                  stock: products[i].prdSelQty,
                },
                transaction
              )
            );
          }
          pageNumber += 1;
        }
      }

      try {
        await Promise.all(promises);
        transaction.commit();
      } catch (error) {
        const errorMessage = `Failed to insert product data:\n${helper.parseError(
          error
        )}`;
        helper.log(`${config.baseLogPath}/errors.txt`, errorMessage);

        transaction.rollback();
        return h.response().code(400);
      }
      return h.response().code(200);
    },
  });

  // Create products
  server.route({
    method: "POST",
    path: "/v1/products",
    handler: async (request, h) => {
      const transaction = await sequelize.transaction();
      const payload = request.payload;

      try {
        await productModel.create({ ...payload, stock: 0 }, transaction);
        transaction.commit();
      } catch (error) {
        const errorMessage = `Failed to insert product data:\n${helper.parseError(
          error
        )}\n`;
        helper.log(`${config.baseLogPath}/errors.txt`, errorMessage);

        transaction.rollback();
        return h.response().code(400);
      }
      return h.response().code(200);
    },
  });

  // List products
  server.route({
    method: "GET",
    path: "/v1/products",
    handler: async (request, h) => {
      const { page, per_page } = request.query;
      const products = await productModel.list(page, per_page);
      return { products: products };
    },
  });

  // Show product
  server.route({
    method: "GET",
    path: "/v1/product/{productId}",
    handler: async (request, h) => {
      const { productId } = request.params;
      const product = await productModel.show(productId);
      return product[0];
    },
  });

  // Update product
  server.route({
    method: "PUT",
    path: "/v1/product/{productId}",
    handler: async (request, h) => {
      const transaction = await sequelize.transaction();
      const { productId } = request.params;
      const payload = request.payload;

      try {
        await productModel.update(productId, { ...payload }, transaction);
        transaction.commit();
      } catch (error) {
        const errorMessage = `Failed to update product data:\n${helper.parseError(
          error
        )}\n`;
        helper.log(`${config.baseLogPath}/errors.txt`, errorMessage);

        transaction.rollback();
        return h.response().code(400);
      }
      return h.response().code(200);
    },
  });

  // Delete product
  server.route({
    method: "DELETE",
    path: "/v1/product/{productId}",
    handler: async (request, h) => {
      const transaction = await sequelize.transaction();
      const { productId } = request.params;

      try {
        await productModel.deleteOne(productId, transaction);
        transaction.commit();
      } catch (error) {
        const errorMessage = `Failed to delete product:\n${helper.parseError(
          error
        )}\n`;
        helper.log(`${config.baseLogPath}/errors.txt`, errorMessage);

        transaction.rollback();
        return h.response().code(400);
      }
      return h.response().code(200);
    },
  });
};
