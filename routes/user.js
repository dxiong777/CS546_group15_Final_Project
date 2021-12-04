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
        const userInfo = await user.getUser(userid);
        var userId = userInfo._id
        var noRest;
        var restaurantListData;
        if (restaurantList.length == 0) {
            noRest = "Sorry No Restaurent found with good Deal"
        } else {
            restaurantListData = restaurantList;
        }
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
        const getShopbyId = await productData.getAllProduct(shopId);
        var shopComment = shopDetail.comment;
        var overallRatings = shopDetail.overallRating;
        var noComments;
        var commentForShop;
        var noRatig;
        var or;

        if (getShopbyId.comment.length != 0) {
            commentForShop = shopComment
        } else {
            noComments = "No review for this shop"
        }
        if (overallRatings == 0) {
            noRatig = "No Review for this Shop"
        } else {
            or = overallRatings;
        }


        var shopName = shopDetail.name;
        var shopAdd = shopDetail.address;
        var shopIdd = shopDetail._id;
        var shopPin = shopDetail.pincode;
        if (getShopbyId) {
            const dataa = {
                allItem: getShopbyId.item,
                shopName: shopName,
                pincode: shopPin,
                shopId: shopIdd,
                userData: userInfo,
                shopDetail: shopDetail,
                commentForShop: commentForShop,
                noComment: noComments,
                noRating: noRatig,
                averageRating: or,
                shopAddress: shopAdd
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
        review,
        replayMessage
    } = req.body;


    try {
        const userInfo = await user.getUser(userid);
        const shopInfo = await shopData.get(shopId);
        const getShopbyId = await productData.getAllProduct(shopId);
        var shopComment = shopInfo.comment;
        var noComment;

        var msgs;
        var coms;
        if (message) {
            msgs = "Thanks for sending replay"
        }
        if (comment) {
            coms = "Thanks For sending Comment"
        }
        ////////////////////////////////////////////////////////////

        // if (replayMessage) {
        //     await shopData.replayMessage(userInfo, shopId, message)
        //     const getShopbyId = await productData.getAllProduct(shopId);

        //     const shopInfonew = await shopData.get(shopId);
        //     var shopComment = shopInfonew.comment;
        //     var noRating;
        //     var averageRating;
        //     if (shopInfonew.overallRating != 0) {
        //         averageRating = shopInfonew.overallRating
        //     } else {
        //         noRating = "No Review for this Shop"
        //     }
        //     var commentss;
        //     var noComments;
        //     if (getShopbyId.comment.length != 0) {
        //         commentss = shopComment
        //     }
        //     if (getShopbyId.comment.length == 0) {
        //         noComments = "No Review for this Shop"
        //     }

        //     var shopName = shopInfo.name
        //     var shopIdd = shopInfo._id;
        //     if (getShopbyId) {
        //         const dataa = {
        //             averageRating: averageRating,
        //             noRating: noRating,
        //             commentForShop: commentss,
        //             noComment: noComments,
        //             allItem: getShopbyId.item,
        //             shopName: shopName,
        //             shopId: shopIdd,
        //             userData: userInfo,
        //             shopDetail: shopInfo,
        //             mess: msgs,
        //             comm: coms
        //         };
        //         res.render('userView', dataa);
        //         return;
        //     }
        // }
        ////////////////////////////////////////////////////////////

        if (review) {

            var checkuser = await shopData.checkuser(userInfo, shopId, review)
            if (checkuser != undefined) {
                const getShopbyId = await productData.getAllProduct(shopId);

                const shopInfonew = await shopData.get(shopId);
                var noRating;
                var averageRating;
                if (shopInfonew.overallRating != 0) {
                    averageRating = shopInfonew.overallRating
                } else {
                    noRating = "No Review for this Shop"
                }
                var commentss;
                var noComments;
                if (getShopbyId.comment.length != 0) {
                    commentss = shopComment
                }
                if (getShopbyId.comment.length == 0) {
                    noComments = "No Review for this Shop"
                }
                var noSecond = "You can not add rating second time"
                var shopName = shopInfo.name
                var shopIdd = shopInfo._id;
                if (getShopbyId) {
                    const dataa = {
                        noSecond: noSecond,
                        averageRating: averageRating,
                        noRating: noRating,
                        commentForShop: commentss,
                        noComment: noComments,
                        allItem: getShopbyId.item,
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
                return;
            }
            var average = await shopData.review(userInfo, shopId, review)
            const getShopbyId = await productData.getAllProduct(shopId);

            const shopInfonew = await shopData.get(shopId);

            var noRating;
            var averageRating;
            if (shopInfonew.overallRating != 0) {
                averageRating = shopInfonew.overallRating
            } else {
                noRating = "No Review for this Shop"
            }
            var commentss;
            var noComments;
            if (getShopbyId.comment.length != 0) {
                commentss = shopComment
            }
            if (getShopbyId.comment.length == 0) {
                noComments = "No Review for this Shop"
            }
            var forRating = "Thanks for rating"

            var shopName = shopInfo.name
            var shopIdd = shopInfo._id;
            if (getShopbyId) {
                const dataa = {
                    forRating: forRating,
                    averageRating: averageRating,
                    noRating: noRating,
                    commentForShop: commentss,
                    noComment: noComments,
                    allItem: getShopbyId.item,
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
            const getShopbyId = await productData.getAllProduct(shopId);

            const shopInfonew = await shopData.get(shopId);
            var shopComment = shopInfonew.comment;
            var noRating;
            var averageRating;
            if (shopInfonew.overallRating != 0) {
                averageRating = shopInfonew.overallRating
            } else {
                noRating = "No Review for this Shop"
            }
            var commentss;
            var noComments;
            if (getShopbyId.comment.length != 0) {
                commentss = shopComment
            }
            if (getShopbyId.comment.length == 0) {
                noComments = "No Review for this Shop"
            }

            var shopName = shopInfo.name
            var shopIdd = shopInfo._id;
            if (getShopbyId) {
                const dataa = {
                    averageRating: averageRating,
                    noRating: noRating,
                    commentForShop: commentss,
                    noComment: noComments,
                    allItem: getShopbyId.item,
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
        if (comment) {
            await shopData.comment(userInfo, shopId, comment)
            const getShopbyId = await productData.getAllProduct(shopId);

            const shopInfonew = await shopData.get(shopId);
            var shopComment = shopInfonew.comment;
            var noRating;
            var averageRating;
            if (shopInfonew.overallRating != 0) {
                averageRating = shopInfonew.overallRating
            } else {
                noRating = "No Review for this Shop"
            }
            var commentss;
            var noComments;
            if (getShopbyId.comment.length != 0) {
                commentss = shopComment
            }
            if (getShopbyId.comment.length == 0) {
                noComments = "No Review for this Shop"
            }

            var shopName = shopInfo.name
            var shopIdd = shopInfo._id;
            if (getShopbyId) {
                const dataa = {
                    averageRating: averageRating,
                    noRating: noRating,
                    commentForShop: commentss,
                    noComment: noComments,
                    allItem: getShopbyId.item,
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



router.delete('/:iduser/shop/:idshop/:messId', async (req, res) => {
    //const idUsers = req.params.idUser;
    const messageId = req.params.messId;
    const iduser = req.params.iduser;
    const idshop = req.params.idshop;
    try {

        const shopDetailId = await user.removeMessage(messageId);
        res.redirect(`/user/${iduser}/shop/${idshop}`)

    } catch (e) {
        res.status(500).json({
            error: e.message
        });
    }

})


module.exports = router;