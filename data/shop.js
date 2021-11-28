const mongoCollections = require('../config/mongoCollections');
const shop = mongoCollections.shop;
const messages = mongoCollections.message;
var mongoose = require('mongoose');
const user = require('./user')
const comments = mongoCollections.comment;



const exportedMethods = {
    async getAll() {
        const movieCollection = await shop();
        const movieList = await movieCollection.find({}).toArray();
        return movieList;
    },

    async getShopWithItem() {
        var shopListWithItem = []
        var noshopWithItem;
        const movieCollection = await shop();
        const allShop = await movieCollection.find({}).toArray();
        allShop.forEach(i => {
            i.item.forEach((element) => {
                if (element.length != 0) {
                    shopListWithItem.push(i)
                }
            });
        });
        if (!shopListWithItem) {
            noshopWithItem = "No Item found in S-mart Deal"
            return noshopWithItem
        }
        var x = [...new Set(shopListWithItem)];
        return x;

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
        return shopData;
    },

    async create(name, item) {
        const resaurantCollection = await shop();
        const newShop = {
            name: name,
            item: [],
            message: [],
            comment: []
        };
        const newInsertInformation = await resaurantCollection.insertOne(newShop);
        const newId = newInsertInformation.insertedId;
        return await this.get(newInsertInformation.insertedId);
    },
    async getAllMessage(id) {
        var allMessag;
        const allMessage = await messages();
        var allMsg = await allMessage.find({}).toArray();
        allMsg.forEach(element => {
            if (element._id == id) {
                allMessag = element;
            }
        });
        return allMessag;
    },
    async message(userInfo, shopId, message) {
        var id = mongoose.Types.ObjectId();

        var convertId = mongoose.Types.ObjectId(shopId);
        const resaurantCollection = await shop();
        const messageCollection = await messages();
        const userInformation = await user.getUser(userInfo._id);
        var usermessage = {
            _id: id,
            idUser: userInformation._id,
            message: message,
            userName: userInformation.name,
            shopId: shopId
        }
        const newaddedItem = await messageCollection.insertOne(usermessage);
        const newInsertInformation = await resaurantCollection.updateOne({
            _id: convertId
        }, {
            $push: {
                message: usermessage
            }
        })
        return;
    },

    async getAllComment(id) {
        var allComment;
        const allCommentsdata = await comments();
        var allComments = await allCommentsdata.find({}).toArray();
        allComments.forEach(element => {
            if (element._id == id) {
                allComment = element;
            }
        });
        return allComment;
    },
    async comment(userInfo, shopId, comment) {
        var id = mongoose.Types.ObjectId();
        var today = new Date();
        var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        var convertId = mongoose.Types.ObjectId(shopId);
        const resaurantCollection = await shop();
        const commentCollection = await comments();
        const userInformation = await user.getUser(userInfo._id);
        var userComment = {
            _id: id,
            idUser: userInformation._id,
            userName: userInformation.name,
            comment: comment,
            shopId: shopId,
            date: date
        }
        const newaddedItem = await commentCollection.insertOne(userComment);
        const newInsertInformation = await resaurantCollection.updateOne({
            _id: convertId
        }, {
            $push: {
                comment: userComment
            }
        })
        return;
    }

}

module.exports = exportedMethods;