const express = require('express');
const router = express.Router();
const data = require('../data');
const shopData = data.shop;
const productData = data.products;
var mongoose = require('mongoose');

router.get('/', function (request, response) {
    const datta = {
        title: "characters Finder"
    };
    response.render('home', datta);
});

router.get('/:id', async function (request, response) {
    const idd = request.params.id;
    const shopDetail = await shopData.get(idd);
    var shopName = shopDetail.name
    var shopId = shopDetail._id;
    const allProduct = await productData.getAllProduct(idd);
    if (allProduct.item.length != 0) {
        const dataa = {
            allItem: allProduct.item,
            title: shopName,
            shopId: shopId
        };
        response.render('allItem', dataa);
    } else {
        response.redirect(`/shopId/addItem/${idd}`)
    }
});

router.get('/addItem/:id', async function (request, response) {
    const idd = request.params.id;
    //console.log(idd)
    const shopDetail = await shopData.get(idd);
    var shopName = shopDetail.name
    const dataa = {
        shopId: idd,
        shopName: shopName
    };
    response.render('addItem', dataa);
});

router.get('/editItem/:id', async function (req, res) {
    var itemId = req.params.id;
    var restDetail = await productData.getShopIdForEditItem(itemId);
    var itemDetail = await productData.getProductDetail(restDetail._id, itemId)
    var data = {
        shopId: restDetail._id,
        itemDetail: itemDetail
    }
    res.render('edititem', data)
});

router.post('/editItem/:id', async function (req, res) {
    const iddProduct = req.params.id;
    const {
        productname,
        productdetails,
        producthighlights,
        price,
        quantityremaining,
        dateofmanufacture,
        dateofexpiry
    } = req.body;
    try {
        const updateStore = await productData.updateProduct(
            iddProduct,
            productname,
            productdetails,
            producthighlights,
            price,
            quantityremaining,
            dateofmanufacture,
            dateofexpiry
        );
        var shopId = updateStore._id;
        res.redirect(`/shopId/${shopId}`)
    } catch (e) {
        res.status(500).json({
            error: e
        });
    }
});

router.get('/addItem/:id', async function (request, response) {
    const idd = request.params.id;
    //console.log(idd)
    const shopDetail = await shopData.get(idd);
    var shopName = shopDetail.name
    const dataa = {
        shopId: idd,
        shopName: shopName
    };
    response.render('addItem', dataa);
    return;
});

router.post('/:id', async function (req, res) {
    const idProduct = req.params.id;
    const {
        productname,
        productdetails,
        producthighlights,
        price,
        quantityremaining,
        dateofmanufacture,
        dateofexpiry
    } = req.body;

    var err = [];

    if (!productname) {
        err.push("Enter Productname")
    }
    // try {
    //     if (err.length != 0) {
    //         var restDetail = await productData.getShopIdForEditItem(idProduct);
    //         // var itemDetail = await productData.getProductDetail(restDetail._id, idProduct)
    //         // var data = {
    //         //     shopId: restDetail._id,
    //         //     itemDetail: itemDetail,
    //         //     errors: err
    //         // }
    //         // res.status(400)
    //         // res.render('addItem', data)
    //         res.redirect(`/shopId/addItem/${restDetail._id}`)
    //         return;
    //     }
    // } catch (e) {
    //     res.status(500).json({
    //         error: e.message
    //     });
    // }

    try {
        const newItem = await productData.createProduct(
            idProduct,
            productname,
            productdetails,
            producthighlights,
            price,
            quantityremaining,
            dateofmanufacture,
            dateofexpiry
        );
       //console.log(newItem)

        res.redirect(`/shopId/${idProduct}`)

    } catch (e) {
        res.status(500).json({
            error: e.message
        });
    }
});

router.get('/:id/allItem', async function (req, res) {
    const idd = req.params.id;
    try {
        const shopDetail = await shopData.get(idd);
        var shopName = shopDetail.name
        var shopItem = shopDetail.item
        const data = {
            title: shopName,
            allItem: newItem,
            shopItem: shopItem
        };
    } catch (e) {
        res.status(500).json({
            error: e
        });
    }
});

router.delete('/delete/:id', async function (req, res) {
    const itemId = req.params.id;
    var iddItem = mongoose.Types.ObjectId(itemId);
    try {
        var restDetail = await productData.getShopIdForEditItem(itemId);
        const shopDetail = await productData.remove(restDetail, itemId);
        res.redirect(`/shopId/${shopDetail}`)
    } catch (e) {
        res.status(500).json({
            error: e.message
        });
    }
})


module.exports = router;