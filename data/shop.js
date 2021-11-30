const mongoCollections = require('../config/mongoCollections');
const shop = mongoCollections.shop;
const messages = mongoCollections.message;
const reviews = mongoCollections.reviews;
const replayMessage = mongoCollections.replayMessages;
var mongoose = require('mongoose');
const user = require('./user')
const comments = mongoCollections.comment;
var userdata = mongoCollections.user;




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
        const findShop = await shop();
        const shopData = await findShop.findOne({
            _id: convertId
        });
        return shopData;
    },

    async create(name, address, pincode, item) {
        intPin = parseInt(pincode)
        const resaurantCollection = await shop();
        const newShop = {
            name: name,
            overallRating: 0,
            item: [],
            message: [],
            comment: [],
            rating: [],
            address: address,
            pincode: intPin
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
        var today = new Date();
        var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
       
        var usermessage = {
            _id: id,
            idUser: userInformation._id,
            message: message,
            userName: userInformation.name,
            shopId: shopId,
            date: date
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
    ////////////////////////////////////////
  
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
    },
    async checkuser(userInfo, shopId, review) {
        var convertId = mongoose.Types.ObjectId(shopId);
        var userId = mongoose.Types.ObjectId(userInfo._id);
        const resaurantCollection = await shop();
        var findStore;
        const store = await resaurantCollection.findOne({
            _id: convertId
        })
        var rat = store.overallRating;
        var xx;
        //console.log(typeof userInfo._id)
        store.rating.forEach(x => {
            var y = (x.idUser).toString()
            if (y == userId) {
                xx = rat
                return
            }
            return //return x;

        })

        return xx;
        // console.log("----")
        // console.log(findStore)
        // return findStore
    },
    async review(userInfo, shopId, reviewss) {
        var id = mongoose.Types.ObjectId();
        var review = parseInt(reviewss)
        var convertId = mongoose.Types.ObjectId(shopId);
        const resaurantCollection = await shop();
        const reviewCollection = await reviews();
        const userInformation = await user.getUser(userInfo._id);
        var userReview = {
            _id: id,
            idUser: userInformation._id,
            userName: userInformation.name,
            review: review,
            shopId: shopId,
        }
        const newaddedItem = await reviewCollection.insertOne(userReview);
        const newInsertInformation = await reviewCollection.updateOne({
            _id: convertId
        }, {
            $push: {
                rating: userReview
            }
        })
        const updateInfo = await resaurantCollection.updateOne({
            _id: convertId
        }, {
            $addToSet: {
                rating: userReview,
            }
        });
        const findStore = await resaurantCollection.findOne({
            _id: convertId
        });
        var allReview = [];
        findStore.rating.forEach(x => {
            allReview.push(x.review)
        })
        var totalSum = 0;
        for (var i in allReview) {
            totalSum += allReview[i];
        }
        var numsCount = allReview.length;
        var average = totalSum / numsCount;
        var averages = (Number(average).toFixed(2));
        //console.log(average)
        const updateFinal = await resaurantCollection.updateOne({
            _id: convertId
        }, {
            $set: {
                overallRating: averages
            }
        });
        const frRee = await resaurantCollection.findOne({
            _id: convertId
        });
        return averages;
    }

}

module.exports = exportedMethods;