const product = require('./products');
const shop = require('./shop');
const user = require('./user');

const constructorMethod = (app) => {
  app.use('/shopId', product);
  app.use('/shop', shop);
  app.use('/user', user);


  app.use("*", (req, res) => {
    res.redirect('/user');
  });

}

module.exports = constructorMethod;