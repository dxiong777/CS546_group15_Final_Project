const shopkeepers = require('./shopkeeper');
const products = require('./products');
const users = require('./user');
const productSearch = require('./productSearch');
const productReview = require('./productReview');

module.exports = {
  shop: shopkeepers,
  products: products,
  user: users,
  productSearch: productSearch,
  productReview: productReview
};
// const shopkeeper = require('./shopkeeper');
// const products = require('./products');
// const user = require('./user');


// module.exports = {
//   shop: shopkeeper,
//   products: products,
//   user: user,

// };