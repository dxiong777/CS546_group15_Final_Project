const product = require('./products');
const shop = require('./shop');

const constructorMethod = (app) => {
  app.use('/shopId', product);
  app.use('/shop', shop);


  app.use("*", (request, response) => {
    response.status(404).json({
      error: "Route not found"
    });
  });

}

module.exports = constructorMethod;