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
    var shopId = shopDetail._id
    //console.log(shopName)
    const allProduct = await productData.getAllProduct(idd);
    //  console.log(allProduct)
    //console.log("---------3--------")
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

    const{productname, productdetails, producthighlights, price,
        quantityremaining,dateofmanufacture, dateofexpiry} = req.body;


    // if (!username || !password) {
    //     const data = {
    //       title: "Login Form",
    //       errors: "Please enter username or password",
    //     }
    //     res.status(400).render('login', data);
    //     return;
    //   }

    try {
        // const restDetail = await productData.getShopIdForEditItem(idd);
        // const itemDetail = await productData.getProductDetail(restDetail._id, itemId)

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

router.post('/:id', async function (req, res) {

    const idProduct = req.params.id;
    const{productname, productdetails, producthighlights, price,
        quantityremaining,dateofmanufacture, dateofexpiry} = req.body;

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

router.post('/delete/:id', async function (req, res) {
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