const express = require('express');
const router = express.Router();
const data = require('../data');
const user = data.user;
const shopData = data.shop;
const productData = data.products;

router.get('/', async (req, res) => {
    try {
        const userList = await user.getAll();
        console.log(userList)
        const data = {
            title: "All user",
            alluser: userList,
        };
        res.render('allUser', data);
    } catch (e) {
        res.status(500).json({
            error: e
        });
    }
});


router.get('/:id1/allshop', async (req, res) => {
    try {
        const userid = req.params.id1;
        const restaurantList = await shopData.getAll();
        const userInfo = await user.getUser(userid);
        var userId = userInfo._id
        //console.log(userId , userInfo.name)
        const data = {
            title: "Shop List",
            allShop: restaurantList,
            userdata: userInfo,
            userId: userId
        };
        res.render('allShopUserView', data);
    } catch (e) {
        res.status(500).json({
            error: e
        });
    }
});

router.get('/:idUser/shop/:shopId', async (req, res) => {
    try {
        const userid = req.params.idUser;
        const shopId = req.params.shopId;

        const userInfo = await user.getUser(userid);
        const shopDetail = await shopData.get(shopId);
        var shopName = shopDetail.name
        var shopIdd = shopDetail._id;
        const allProduct = await productData.getAllProduct(idd);
        const dataa = {
            allItem: allProduct.item,
            shopName: shopName,
            shopId: shopIdd,
            userData: userInfo
        };
        res.render('userView', dataa);
        return;

    } catch (e) {
        res.status(500).json({
            error: e
        });
    }
});


router.post('/', async (req, res) => {
    const userData = req.body;
    const name = userData.name;

    try {
        const userData = await user.create(name);
        const data = {
            title: "All user",
            alluser: userData,
        };
        response.render('alluser', data);
    } catch (e) {
        res.status(500).json({
            error: e
        });
    }
});


module.exports = router;