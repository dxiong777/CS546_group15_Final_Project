const mongoCollections = require('../config/mongoCollections');
const user = mongoCollections.user;
var mongoose = require('mongoose');


const exportedMethods = {
    async getAll() {
        const movieCollection = await user();
        const movieList = await movieCollection.find({}).toArray();
        return movieList;
    },
    async getUser(id) {
        var x = id.toString()
        var convertId = mongoose.Types.ObjectId(id);
        const findShopItem = await user();
        const findShop = await findShopItem.findOne({
            _id: convertId
        });
        return findShop;
    },
    async get(id) {
        var x = id.toString()
        var convertId = mongoose.Types.ObjectId(id);
        const findShop = await user();
        const shopData = await findShop.findOne({
            _id: convertId
        });
        return shopData;
    },

    async create(name, item) {
        const resaurantCollection = await user();
        const newShop = {
            name: name,
            item: []
        };
        const newInsertInformation = await resaurantCollection.insertOne(newShop);
        const newId = newInsertInformation.insertedId;
        return await this.get(newInsertInformation.insertedId);
    },

}

module.exports = exportedMethods;