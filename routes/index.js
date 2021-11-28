const product = require('./products');
const shop = require('./shop');
const user = require('./user');
const comment = require('./comment');

const constructorMethod = (app) => {
  app.use('/shopId', product);
  app.use('/shop', shop);
  app.use('/user', user);
  //app.use('./comment', comment);


  app.use("*", (req, res) => {
    res.redirect('/user');
  });

}

module.exports = constructorMethod;