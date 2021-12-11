

const product = require('./products');
const shop = require('./shopkeeper');
const users = require('./users');
const productSearch = require('./productSearch')
const productReview = require('./productReview')

const constructorMethod = (app) => {

  app.use('/shopId', product);
  app.use('/shop', shop);
  app.use('/users', users);
  app.use('/productSearch', productSearch);
  app.use('/productReview', productReview);
 app.use('/', shop); 
  app.use("*", (req, res) => {
   res.redirect('/');
    
  });
  app.use('*', (req, res) => {
    res.redirect('/');
  });
}
  


module.exports = constructorMethod;