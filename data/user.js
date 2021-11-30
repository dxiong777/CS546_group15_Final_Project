const mongoCollections = require('../config/mongoCollections');
const user = mongoCollections.user;
var mongoose = require('mongoose');
const {
    replayMessages
} = require('../config/mongoCollections');
const shop = mongoCollections.shop;
const messages = mongoCollections.message;
const replayMessage = mongoCollections.replayMessages;

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
            item: [],
            replayMessages: []
        };
        const newInsertInformation = await resaurantCollection.insertOne(newShop);
        const newId = newInsertInformation.insertedId;
        return await this.get(newInsertInformation.insertedId);
    },

    async removeMessage(messageId) {
        var iddItem = mongoose.Types.ObjectId(messageId);
        const messageCollection = await replayMessages();
        const userCollection = await user();

        const usergetDetail = await messageCollection.findOne({
            _id: iddItem
        })
        var userId = usergetDetail.idUser;
        await messageCollection.deleteOne({
            _id: iddItem
        });

        await userCollection.updateOne({
            _id: userId
        }, {
            $pull: {
                replayMessages: {
                    _id: iddItem
                }
            }
        });
        return;

    },

    async replayMessage(idusers, storeId, replayMessages) {
        var id = mongoose.Types.ObjectId();

        // var message;
        // if (!replayMessages) {
        //     message = ('Please enter productname');
        //     return message
        // }

        var iduserCon = mongoose.Types.ObjectId(idusers);
        var storeIdCon = mongoose.Types.ObjectId(storeId);
        const userInfo = await this.getUser(idusers);
        const findShop = await shop();
        const shopDetail = await findShop.findOne({
            _id: storeIdCon
        });
        const userCollection = await user();
        var messagereplayCollection = await replayMessage();

        const messageCollection = await messages();
        const sendMessage = await messageCollection.find({}).toArray();


        var finalMessage;
        sendMessage.forEach(x => {
            console.log(x)
            if (x.shopId == storeIdCon) {
                finalMessage = x
            }
            return;
        })

        var today = new Date();
        var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
       

        var userReplaymessage = {
            _id: id,
            idUser: iduserCon,
            message: replayMessages,
            userName: userInfo.name,
            shopNmae: shopDetail.name,
            isShop: storeIdCon,
            date: date
        }
        const newaddedItem = await messagereplayCollection.insertOne(userReplaymessage);
        const newInsertInformation = await userCollection.updateOne({
            _id: finalMessage.idUser
        }, {
            $push: {
                replayMessages: userReplaymessage
            }
        })
        return;
    },


}

module.exports = exportedMethods;