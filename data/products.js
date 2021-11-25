const mongoCollections = require('../config/mongoCollections');
const products = mongoCollections.products;
const shops = mongoCollections.shop;
var mongoose = require('mongoose');
var shop = require("./shop")
//const shop = data.shop;

const exportedMethods = {
    // async getAllProduct(id) {
    //     const allProduct = await products();
    //     var resList = await resaurantCollection.find({}).toArray();
    //     if (!resList) console.log('No shop in system!');
    //     return allId;
    // },

    async getProduct(id) {
        var x = id.toString()
        var convertId = mongoose.Types.ObjectId(id);
        const findShopItem = await products();
        const findShop = await findShopItem.findOne({
            _id: convertId
        });
        if (findShop) {
            var restAllItem = findShop.item;
            return restAllItem
        } else {
            var noData = "No Item"
            return noData
        }
    },

    async createProduct(shopId, productname, productdetails, producthighlights, price, quantityremaining, dateofmanufacture, dateofexpiry) {
      //  console.log("AA")

        var id = mongoose.Types.ObjectId();
        var convertId = mongoose.Types.ObjectId(shopId);

        const shopCollection = await shops();
        //console.log("BB")
        const newItem = {
            _id: id,
            productname: productname,
            productdetails: productdetails,
            producthighlights: producthighlights,
            price: price,
            quantityremaining: quantityremaining,
            dateofmanufacture: dateofmanufacture,
            dateofexpiry: dateofexpiry
        };
 

        const newInsertInformation = await shopCollection.updateOne({
            _id: convertId
        }, {
            $push: {
                item: newItem
            }
        })

        const shopDetail = await shop.get(shopId);
        var shopItem = shopDetail.item;
       // console.log("--------------------CC")
        return shopItem;
    },
}

module.exports = exportedMethods;