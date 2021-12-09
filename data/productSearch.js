const { ObjectId } = require('mongodb');
var mongoose = require('mongoose');
const mongoCollections = require("../config/mongoCollections");
const productsForSearch = mongoCollections.productsForSearch;

const exportedMethods = {
    async addProductForSearch(productname, productdetails, producthighlights, price, quantityremaining, dateofmanufacture, dateofexpiry) {
        const productCollection = await productsForSearch();

        var id = mongoose.Types.ObjectId();
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

        // if ((!quantityremaining) || typeof qtyRem != 'number' || !(String(quantityremaining).match(/^[0-5]{1}$/))) {
        //     message = `quantityremaining is in 0 to 5 no "${quantityremaining}".`
        //     return message
        // }

        const newItem = {
            _id: id,
            productname: productname,
            productdetails: productdetails,
            producthighlights: producthighlights,
            price: price,
            quantityremaining: quantityremaining,
            dateofmanufacture: dateofmanufacture,
            dateofexpiry: dateofexpiry,
            rating: 0,
            reviews: [],
        };
        console.log(newItem);

        const insertInfo = await productCollection.insertOne(newItem);
        if (insertInfo.insertedCount === 0) throw "could not add product";
        const newId = insertInfo.insertedId;
        const newIDString = String(newId);
        const product = await this.getProductForSearch(newIDString);
        return product;
    },
    async updateProductForSearch(id, productname, productdetails, producthighlights, price, quantityremaining, dateofmanufacture, dateofexpiry) {
        const productCollection = await productsForSearch();
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

        const updatedItem = {
            shopId: shopId,
            productname: productname,
            productdetails: productdetails,
            producthighlights: producthighlights,
            price: price,
            quantityremaining: quantityremaining,
            dateofmanufacture: dateofmanufacture,
            dateofexpiry: dateofexpiry
        };

        const newaddedItem = await productCollection.updateOne({_id: id}, {$set: updatedItem});
        if (newaddedItem.modifiedCount === 0) throw "Error (updateProduct): Failed to update product in DB.";
        const product = await this.getProductForSearch(id);
        return newaddedItem;
    },

    async getProductForSearch(id) {
        if (!id) throw "id must be given";
        if (typeof(id) === "string") id = ObjectId.createFromHexString(id);
        const productCollection = await productsForSearch();
        const product = await productCollection.findOne({ _id: id});
        if (!product) throw "product with that id does not exist";
        return product;
    },

    async getProductsViaSearch(search) {
        if (!search) throw "Error (getProductsViaSearch): Must provide search.";
        if (typeof(search) !== "string") throw "Error (getProductsViaSearch): Search must be a string.";
        const productCollection = await productsForSearch();
        const query = new RegExp(search, "i");
        const productList = await productCollection.find({ $or: [ {productname: {$regex: query}}, {productdetails: {$regex: query}} ] }).toArray();
        return productList;
    },

    async getAllProducts() {
        const productCollection = await productsForSearch();
        const productList = await productCollection.find({}).toArray();
        if (productList.length === 0) throw "no restaurants in the collection";
        return productList;
    }
}

module.exports = exportedMethods;