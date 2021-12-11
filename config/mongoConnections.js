const MongoClient = require('mongodb').MongoClient;
const settings =  {
    mongoConfig: {
      serverUrl: 'mongodb://localhost:27017/',
      database: 'Group_15'
    }
  };
  const mongoConfig = settings.mongoConfig;
  let _connection = undefined;
let _db = undefined;



module.exports = {
    getDb : async () => {

  if (!_connection) {
    _connection = await MongoClient.connect(mongoConfig.serverUrl, {
      useNewUrlParser: true
    }, {useUnifiedTopology: true});

module.exports = {
    getDb : async () => {
  if (!_connection) {
    _connection = await MongoClient.connect(mongoConfig.serverUrl, {
      useNewUrlParser: true
    });

    _db = await _connection.db(mongoConfig.database);
  }

  return _db;

},
removeConnection: async () => {
    _connection.close();
  }
}

