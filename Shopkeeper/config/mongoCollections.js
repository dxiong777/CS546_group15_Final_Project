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
    shopkeeper = getCollectionFn('shopkeeper')
}