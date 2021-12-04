const mongoCollections = require('../config/mongoCollections');
const products = mongoCollections.products;
const shops = mongoCollections.shop;
const messages = mongoCollections.message;
var mongoose = require('mongoose');
var shop = require("./shop");

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
    async allProductBeforeExpire(id) {
        var idd = mongoose.Types.ObjectId(id);
        const productCollection = await products();
        const shopCollection = await shops();
        var allProducts = [];
        const allProduct = await shops();
        var allShop = await allProduct.find({}).toArray();
        allShop.forEach(element => {
            if (element._id == id) {
                resDetail = element;
            }
        });

        resDetail.item.forEach(async (x) => {
            var todayDate = new Date().toISOString().slice(0, 10);
            var d1 = Date.parse(x.dateofexpiry);
            if (todayDate > x.dateofexpiry) {

                await productCollection.deleteOne({
                    _id: x._id
                });
                await shopCollection.updateOne({
                    _id: idd
                }, {
                    $pull: {
                        item: {
                            _id: x._id
                        }
                    }
                });
            }
        })
        await this.getAllProduct(id)
    },
    async getShopIdForEditItem(id) {
        var shopCollection = await shops();
        var idd = mongoose.Types.ObjectId(id);
        var shopId;
        const findShopItem = await products();
        const findShop = await findShopItem.findOne({
            _id: idd
        });
        if (!findShop) {
            return "ok";
        }
        shopId = findShop.shopId
        var shopObj = mongoose.Types.ObjectId(shopId);
        const findStore = await shopCollection.findOne({
            _id: shopObj
        });
        var shopFind = findStore
        return shopFind
    },
    async getShopIdForDeleteMessage(id) {
        var shopCollection = await shops();
        var idd = mongoose.Types.ObjectId(id);

        var shopId;
        const findMessageItem = await messages();
        const findMessage = await findMessageItem.findOne({
            _id: idd
        });
        shopId = findMessage.shopId
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

        var todayDate = new Date().toISOString().slice(0, 10);


        mDate = new Date(dateofmanufacture);
        eData = new Date(dateofexpiry);
        var qtyRem = parseInt(quantityremaining)

        if (!productname) {
            message = ('Please enter productname');
            return message
        }
        if (!productdetails) {
            message = ('Please enter productdetails');
            return message
        }
        if (!producthighlights) {
            message = ('Please enter producthighlights');
            return message
        }
        if (!price) {
            message = ('Please enter price');
            return message
        }
        if (!quantityremaining) {
            message = ('Please enter quantityremaining');
            return message
        }
        if (!dateofmanufacture) {
            message = ('Please enter dateofmanufacture');
            return message
        }
        if (!dateofexpiry) {
            message = ('Please enter dateofexpiry');
            return message
        }




        if (dateofmanufacture > todayDate) {
            message = ('Date of Manufacture can\'t be future data');
            return message
        }
        if (dateofexpiry < todayDate) {
            message = ('Date of Expire can\'t be past date');
            return message
        }

        if ((!productname) || typeof productname != 'string') {
            message = `productname "${productname}" is not valid.`
            return message
        }
        if ((!productdetails) || typeof productdetails != 'string' || (!productdetails.match(/^[0-9A-z ]{5,}$/))) {
            message = `productdetails "${productdetails}" is not valid.`
            return message
        }
        if ((!producthighlights) || typeof producthighlights != 'string') {
            message = `producthighlights "${producthighlights}" is not valid.`
            return message
        }

        if ((!price) || (!price.match(/^(?!0\d)\d*(\.\d+)?$/))) {
            message = `Price "${price}" is not valid`
            return message
        }

        if ((!quantityremaining) || typeof qtyRem != 'number' || (!quantityremaining.match(/^[0-5]{1}$/))) {
            message = `quantityremaining is in 0 to 5 no "${quantityremaining}".`
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
        findStore.item.forEach(x => {
            if (x.productname == newItem.productname) {
                message = (`${newItem.productname} is available in your Database`)
            }
        })
        if (message) {
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

        var todayDate = new Date().toISOString().slice(0, 10);


        mDate = new Date(dateofmanufacture);
        eData = new Date(dateofexpiry);
        var qtyRem = parseInt(quantityremaining)

        if (!productname) {
            message = ('Please enter productname');
            return message
        }
        if (!productdetails) {
            message = ('Please enter productdetails');
            return message
        }
        if (!producthighlights) {
            message = ('Please enter producthighlights');
            return message
        }
        if (!price) {
            message = ('Please enter price');
            return message
        }
        if (!quantityremaining) {
            message = ('Please enter quantityremaining');
            return message
        }
        if (!dateofmanufacture) {
            message = ('Please enter dateofmanufacture');
            return message
        }
        if (!dateofexpiry) {
            message = ('Please enter dateofexpiry');
            return message
        }

        if (dateofmanufacture > todayDate) {
            message = ('Date of Manufacture can\'t be future data');
            return message
        }
        if (dateofexpiry < todayDate) {
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
    async removeMessage(restDetail, messageId) {
        var iddItem = mongoose.Types.ObjectId(messageId);
        const messageCollection = await messages();
        const shopCollection = await shops();
        await messageCollection.deleteOne({
            _id: iddItem
        });
        await shopCollection.updateOne({
            _id: restDetail._id
        }, {
            $pull: {
                message: {
                    _id: iddItem
                }
            }
        });
        return restDetail._id

    },


}

module.exports = exportedMethods;