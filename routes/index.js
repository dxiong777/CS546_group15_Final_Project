const product = require('./products');
const shop = require('./shop');

const constructorMethod = (app) => {
  app.use('/shopId', product);
  app.use('/shop', shop);


  app.use("*", (req, res) => {
    res.redirect('/shop');
  });

}

module.exports = constructorMethod;