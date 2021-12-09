const product = require('./products');
const shop = require('./shop');
const user = require('./user');
const productSearch = require('./productSearch')
const productReview = require('./productReview')

const constructorMethod = (app) => {
  app.use('/shopId', product);
  app.use('/shop', shop);
  app.use('/user', user);
  app.use('/productSearch', productSearch);
  app.use('/productReview', productReview);

  app.use("*", (req, res) => {
    res.redirect('/user');
  });

}

module.exports = constructorMethod;