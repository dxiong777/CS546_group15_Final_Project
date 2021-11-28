const mongoCollections = require('../config/mongoCollections');
const products = mongoCollections.products;
const shops = mongoCollections.shop;
var mongoose = require('mongoose');
var shop = require("./shop");
const {
    all
} = require('../routes/products');
//const shop = data.shop;

const exportedMethods = {

    async getAllProduct(id) {
        var allProducts;
        const allProduct = await shops();
        var allShop = await allProduct.find({}).toArray();
        allShop.forEach(element => {
            if (element._id == id) {
                allProducts = element;
            }
        });
        return allProducts;
    },
    async getShopIdForEditItem(id) {
        var shopCollection = await shops();
        var idd = mongoose.Types.ObjectId(id);
        var shopId;
        const findShopItem = await products();
        const findShop = await findShopItem.findOne({
            _id: idd
        });
        console.log(findShop)
        shopId = findShop.shopId
        var shopObj = mongoose.Types.ObjectId(shopId);
        const findStore = await shopCollection.findOne({
            _id: shopObj
        });
        var shopFind = findStore
        return shopFind
    },
    async getProductDetail(restId, itemId) {
        var specificItem;
        var allShopItem = await this.getShopIdForEditItem(itemId)
        allShopItem.item.forEach(x => {
            if ((x._id) == (itemId)) {
                specificItem = (x);
            }
        })
        return specificItem
    },
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
        const productCollection = await products();

        var id = mongoose.Types.ObjectId();
        var convertId = mongoose.Types.ObjectId(shopId);
        var message;

        var CurrentDate = new Date();
        mDate = new Date(dateofmanufacture);
        eData = new Date(dateofexpiry);
        var priceNum = parseInt(price)
        var qtyRem = parseInt(quantityremaining)
        if (mDate >= CurrentDate) {
            message = ('Date of Manufacture can\'t be future data');
            return message
        }
        if (eData <= CurrentDate) {
            message = ('Date of Expire can\'t be past date');
            return message
        }
        if ((!productname) || typeof productname != 'string') {
            message = `productname "${productname}" is not valid`
            return message
        }
        if ((!productdetails) || typeof productdetails != 'string' || (!productdetails.match(/^[0-9A-z]{5,}$/))) {
            message = `productdetails "${productdetails}" is not valid or not atleast 5 charcture`
            return message
        }
        if ((!producthighlights) || typeof producthighlights != 'string') {
            message = `producthighlights "${producthighlights}" is not valid`
            return message
        }
        if ((!price) || typeof priceNum != 'number' || (!price.match(/^[0-9]{1,}$/))) {
            message = `Price "${price}" is not valid`
            return message
        }
        if ((!quantityremaining) || typeof qtyRem != 'number' || (!quantityremaining.match(/^[0-9]{1,}$/))) {
            message = `quantityremaining "${quantityremaining}" is not valid or not atleast 5 charcture`
            return message
        }

        const shopCollection = await shops();
        const newItem = {
            _id: id,
            shopId: shopId,
            productname: productname,
            productdetails: productdetails,
            producthighlights: producthighlights,
            price: price,
            quantityremaining: quantityremaining,
            dateofmanufacture: dateofmanufacture,
            dateofexpiry: dateofexpiry
        };

        const findStore = await shopCollection.findOne({
            _id: convertId
        });
        //console.log(findStore)
        findStore.item.forEach(x => {
            //console.log(x.productname +" === "+ newItem.productname)
            if (x.productname == newItem.productname) {
                message = (`${newItem.productname} is available in your Database`)
            }
        })
        //console.log(message)
        if (message) {
            //console.log("abb")
            return message;
        }

        const newaddedItem = await productCollection.insertOne(newItem);
        const newId = newaddedItem.insertedId;
        const newInsertInformation = await shopCollection.updateOne({
            _id: convertId
        }, {
            $push: {
                item: newItem
            }
        })
        const shopDetail = await shop.get(shopId);
        var shopItem = shopDetail.item;
        return shopItem;
    },


    async updateProduct(productId, productname, productdetails, producthighlights, price, quantityremaining, dateofmanufacture, dateofexpiry) {
        var id = mongoose.Types.ObjectId();
        var convertId = mongoose.Types.ObjectId(productId);

        var message;

        var CurrentDate = new Date();
        mDate = new Date(dateofmanufacture);
        eData = new Date(dateofexpiry);

        if (mDate >= CurrentDate) {
            message = ('Date of Manufacture can\'t be future data');
            return message
        }
        if (eData <= CurrentDate) {
            message = ('Date of Expire can\'t be past date');
            return message
        }

        const shopCollection = await shops();
        const productCollection = await products();

        const restDetail = await this.getShopIdForEditItem(productId);
        const AllitemDetailofspecificItem = await this.getProductDetail(restDetail._id, productId)

        const updateItem = {
            _id: AllitemDetailofspecificItem._id,
            productname: productname,
            productdetails: productdetails,
            producthighlights: producthighlights,
            price: price,
            quantityremaining: quantityremaining,
            dateofmanufacture: dateofmanufacture,
            dateofexpiry: dateofexpiry
        };
        await productCollection.updateOne({
            _id: convertId
        }, {
            $set: {
                _id: updateItem._id,
                productname: updateItem.productname,
                productdetails: updateItem.productdetails,
                producthighlights: updateItem.producthighlights,
                price: updateItem.price,
                quantityremaining: updateItem.quantityremaining,
                dateofmanufacture: updateItem.dateofmanufacture,
                dateofexpiry: updateItem.dateofexpiry
            }
        })
        await shopCollection.updateOne({
            _id: restDetail._id,
            "item._id": AllitemDetailofspecificItem._id
        }, {
            $set: {
                "item.$": updateItem
            }
        })
        const updateStore = await shopCollection.findOne({
            _id: restDetail._id
        });
        return updateStore;
    },

    async remove(restDetail, itemId) {
        // console.log(restDetail)
        var iddItem = mongoose.Types.ObjectId(itemId);
        const productCollection = await products();
        const shopCollection = await shops();
        await productCollection.deleteOne({
            _id: iddItem
        });
        await shopCollection.updateOne({
            _id: restDetail._id
        }, {
            $pull: {
                item: {
                    _id: iddItem
                }
            }
        });

        return restDetail._id
    },


}

module.exports = exportedMethods;