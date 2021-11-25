const express = require('express');
const router = express.Router();
const data = require('../data');
const shopData = data.shop;
const productData = data.products;


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
    const dataa = {
        shopId: idd,
        shopName: shopName
    };
    response.render('addItem', dataa);
});

router.post('/:id/item', async function (req, res) {

    const idd = req.params.id;
    let userInfo = req.body;
    let productname = userInfo.productname;
    let productdetails = userInfo.productdetails;
    let producthighlights = userInfo.producthighlights;
    let price = userInfo.price;
    let quantityremaining = userInfo.quantityremaining;
    let dateofmanufacture = userInfo.dateofmanufacture;
    let dateofexpiry = userInfo.dateofexpiry;
    try {
        const newItem = await productData.createProduct(
            idd,
            productname,
            productdetails,
            producthighlights,
            price,
            quantityremaining,
            dateofmanufacture,
            dateofexpiry
        );

        const shopDetail = await shopData.get(idd);
        var shopName = shopDetail.name
        const data = {
            title: shopName,
            allItem: newItem
        };
        res.render('allItem', data);

    } catch (e) {
        res.status(500).json({
            error: e
        });
    }

});


module.exports = router;