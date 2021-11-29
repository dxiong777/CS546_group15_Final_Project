const express = require('express');
const router = express.Router();
const data = require('../data');
const user = data.user;
const shopData = data.shop;
const productData = data.products;

router.get('/', async (req, res) => {
    try {
        const userList = await user.getAll();
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
        const restaurantList = await shopData.getShopWithItem();
        //console.log(restaurantList)
        const userInfo = await user.getUser(userid);
        var userId = userInfo._id
        var noRest;
        var restaurantListData;
        if (restaurantList.length == 0) {
            noRest = "Sorry No Restaurent found with good Deal"
        } else {
            restaurantListData = restaurantList;
        }
        console.log(noRest)
        console.log(restaurantListData)
        const data = {
            title: "Shop List",
            allShop: restaurantListData,
            noData: noRest,
            userdata: userInfo,
            userId: userId
        };
        res.render('allShopUserView', data);
    } catch (e) {
        res.status(500).json({
            error: e.message
        });
    }
});

router.get('/:idUser/shop/:shopId', async (req, res) => {
    try {
        const userid = req.params.idUser;
        const shopId = req.params.shopId;
        const userInfo = await user.getUser(userid);
        const shopDetail = await shopData.get(shopId);
        const allProduct = await productData.getAllProduct(shopId);
        var shopComment = shopDetail.comment;
        var overallRatings = shopDetail.overallRating;
        var noComment;
        var comments;
        var noRatig;
        var or;

        if (allProduct.comment.length != 0) {
            comments = shopComment
        }
        if (allProduct.overallRating == 0) {
            noComment = "No Review for this Shop"
        } else {
            or = overallRatings;
        }
        if (allProduct.overallRating == 0) {
            noRatig = "No rating for this Shop"
        }

        var shopName = shopDetail.name
        var shopIdd = shopDetail._id;
        if (allProduct) {
            const dataa = {
                allItem: allProduct.item,
                shopName: shopName,
                shopId: shopIdd,
                userData: userInfo,
                shopDetail: shopDetail,
                commentForShop: comments,
                noComment: noComment,
                noRating: noRatig,
                averageRating: or
            };
            res.render('userView', dataa);
            return;
        }

    } catch (e) {
        res.status(500).json({
            error: e.message
        });
    }
});

router.post('/:idUser/shop/:shopId', async (req, res) => {
    const userid = req.params.idUser;
    const shopId = req.params.shopId;

    const {
        message,
        comment,
        review
    } = req.body;
  

    try {
        const userInfo = await user.getUser(userid);
        const shopInfo = await shopData.get(shopId);
        const allProduct = await productData.getAllProduct(shopId);
        var shopComment = shopInfo.comment;
        var noComment;
        var comments;

        var msgs;
        var coms;
        if (message) {
            msgs = "Thanks for sending replay"
        }
        if (comment) {
            coms = "Thanks For sending Comment"
        }
        if (review) {

            var average = await shopData.review(userInfo, shopId, review)
            const allProduct = await productData.getAllProduct(shopId);

            const shopInfonew = await shopData.get(shopId);
            var noRating;
            var averageRating;
            if (allProduct.rating.length != 0) {
                averageRating = average
            }
            if (allProduct.overallRating == 0) {
                noRating = "No Review for this Shop"
            }
            var commentss;
            var noComments;
            if (allProduct.comment.length != 0) {
                commentss = shopComment
            }
            if (allProduct.comment.length == 0) {
                noComments = "No Review for this Shop"
            }

            var shopName = shopInfo.name
            var shopIdd = shopInfo._id;
            if (allProduct) {
                const dataa = {
                    averageRating: averageRating,
                    noRating: noRating,
                    commentForShop: commentss,
                    noComment: noComments,
                    allItem: allProduct.item,
                    shopName: shopName,
                    shopId: shopIdd,
                    userData: userInfo,
                    shopDetail: shopInfo,
                    mess: msgs,
                    comm: coms
                };
                res.render('userView', dataa);
                return;
            }

        }

        if (message) {
            await shopData.message(userInfo, shopId, message)
            var shopName = shopInfo.name
            var shopIdd = shopInfo._id;
            if (allProduct) {
                const dataa = {
                    commentForShop: comments,
                    noComment: noComment,
                    allItem: allProduct.item,
                    shopName: shopName,
                    shopId: shopIdd,
                    userData: userInfo,
                    shopDetail: shopInfo,
                    mess: msgs,
                    comm: coms
                };
                res.render('userView', dataa);
                return;
            }
        } else {
            await shopData.comment(userInfo, shopId, comment)
            const allProduct = await productData.getAllProduct(shopId);

            const shopInfonew = await shopData.get(shopId);
            var shopComment = shopInfonew.comment;
            var commentss;
            var noComments;
            if (allProduct.comment.length != 0) {
                commentss = shopComment
            }
            if (allProduct.comment.length == 0) {
                noComments = "No Review for this Shop"
            }

            var shopName = shopInfo.name
            var shopIdd = shopInfo._id;
            if (allProduct) {
                const dataa = {
                    commentForShop: commentss,
                    noComment: noComments,
                    allItem: allProduct.item,
                    shopName: shopName,
                    shopId: shopIdd,
                    userData: userInfo,
                    shopDetail: shopInfo,
                    mess: msgs,
                    comm: coms
                };
                res.render('userView', dataa);
                return;
            }
        }

    } catch (e) {
        res.status(500).json({
            error: e.message
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