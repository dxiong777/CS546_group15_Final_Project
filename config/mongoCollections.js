/* This will allow you to have one reference to each collection per app */
/* Feel free to copy and paste this this */
const dbConnection = require('./mongoConnections');
const getCollectionFn = (collection) => {
  let _col = undefined;
  return async () => {
    if (!_col) {
      const db = await dbConnection.getDb();
      _col = await db.collection(collection);
    }
    return _col;
  };
};
module.exports = {
  products: getCollectionFn('products'),
  user: getCollectionFn('user'),
  message: getCollectionFn('message'),
  comment: getCollectionFn('comment'),
  reviews: getCollectionFn('reviews'),
  replayMessages: getCollectionFn('replayMessages'),
  shopkeeper: getCollectionFn('shopkeeper'),
  productsForSearch: getCollectionFn('products'),
  reviewForProduct: getCollectionFn('reviewForProduct')
};

