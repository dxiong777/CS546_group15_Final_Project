const product = require('./products');
const shop = require('./shop');
const user = require('./user');

const mainRoutes = require('./users');
const routes = require('./shopkeeper');

const constructorMethod = (app) => {
  app.use('/', routes);  
  app.use('/users',mainRoutes)
  app.use('/shopId', product);
  app.use('/shop', shop);
  app.use('/user', user);


  app.use("*", (req, res) => {

   res.redirect('/');

   // res.redirect('/user');

  });

}

module.exports = constructorMethod;