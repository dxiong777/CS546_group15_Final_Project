const mongoCollections = require('../config/mongoCollections');
const shop = mongoCollections.shop;
var mongoose = require('mongoose');


const exportedMethods = {
    async getAll() {
       // console.log("BB")
        const movieCollection = await shop();
        const movieList = await movieCollection.find({}).toArray();
        return movieList;
    },

    async get(id) {
        var x = id.toString()
        var convertId = mongoose.Types.ObjectId(id);
        // console.log(convertId)
        const findShop = await shop();
        // console.log("a")
        const shopData = await findShop.findOne({
            _id: convertId
        });
        if (!shopData) console.log("----------------------------------no shop found");
        return shopData;
    },

    async create(name, item) {
        const resaurantCollection = await shop();
        const newShop = {
            name: name,
            item: []
        };
        const newInsertInformation = await resaurantCollection.insertOne(newShop);
        const newId = newInsertInformation.insertedId;
        // console.log(typeof newId)
        return await this.get(newInsertInformation.insertedId);
    },

}

module.exports = exportedMethods;