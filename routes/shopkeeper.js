
const express = require('express');
const router = express.Router();
const {
    ObjectId
} = require('bson');
const data = require('../data');
var shop = data.shop

router.get("/", async(req,res)=>{
    res.render("pages/home");
});

router.get("/login", async (req, res) => {
    // console.log(req.session.user.authenticatedUser._id)

    var id = (req.session.userId)
    // console.log("--------------------------------")
    // console.log(id)
    // var shopId = id.toString();
    if (req.session.username) {
        res.redirect(`/shopId/${id}`);
        //     res.redirect(`/shopId/${req.session._id}`);
        return;
    } else {
        res.render("s_login/s_login");
        return;
    }
});

router.get("/signup", async (req, res) => {
    // if(req.session.username){
    //     res.redirect(`/shopId/${req.session._id}`);
    //     return;
    // }
    // else{
    res.render("s_signup/s_signup");
    return;
    // }
});

router.post("/signup", async (req, res) => {
    try {
        try {
            // console.log(req.body.username);
            // console.log(req.body.password);
            console.log("aa---------------------------------------------------")
            const newShopkeeper = await shop.createShopkeeper(req.body.ShopName, req.body.username, req.body.ownerFirstname, req.body.ownerLastname, req.body.Address, req.body.email, req.body.pincode, req.body.phoneNumber, req.body.password, req.body.overallRating, req.body.item, req.body.message, req.body.comment, req.body.rating);
            console.log(newShopkeeper)
            if (newShopkeeper.userInsterted) {
                res.redirect("/login");
                return;
            }
        } catch (e) {
            res.status(400).render("s_signup/s_signup", {
                "error": e
            });
            return;
        }
    } catch (e) {
        res.status(500).json({
            error: "Internal server error"
        });
        return;
    }
});

router.post("/login", async (req, res) => {
    try {
        try {
            // console.log(req.body.username);
            // console.log(req.body.password);
            const existingUser = await shop.checkShopkeeper(req.body.username, req.body.password);
          //  console.log("check------------------------------------------------")
             req.session.user = existingUser;
            // console.log(existingUser)
            if (existingUser) {
                req.session.username = req.body.username;
                var shopId = existingUser.authenticatedUser._id.toString();
                req.session.userId = existingUser.authenticatedUser._id.toString();
                res.redirect(`/shopId/${shopId}`);
                return;
            } else {
                res.status(400).render("s_login/s_login", {
                    "error": "Invalid username or password"
                });
            }
        } catch (e) {
            console.log(e);
            res.status(400).render("s_login/s_login", {
                "error": "Either the username or password is incorrect"
            });
        }
    } catch (e) {
        res.status(500).json({
            error: "Internal server error"
        });
    }
});

router.get(`/shopId/:id`, async (req, res) => {
    var idd = req.params.id
    try {
        const User = await shop.get(idd);
        console.log(User)

        if (User) {
            // req.session.username = req.body.username;
            // req.session.userId = User._id.toString();
            res.render("s_private/s_private", {
                username: User.username
            });
            return;
        }
    } catch (e) {
        console.log(e);
    }
});

router.get("/logout", async (req, res) => {
    console.log('inside logout')
    req.session.destroy();
    // var id = (req.session.userId)
    // // console.log("--------------------------------")
    // // console.log(id)
    // // var shopId = id.toString();
    // if (req.session.username) {
    //     res.redirect(`/shopId/${id}`);


    //if (!id) {
        res.redirect('/login');
        return;
   // }
  
    // res.redirect(`/shopId/${id}`);
   // return;
});

router.get("/edit/:id", async (req, res) => {
    var idd = req.params.id;
    console.log(idd)
    //let details = req.session.user.authenticatedUser
    // req.session.destroy();

    var shopDetail = await shop.getAllDataOfShop(idd);
   // console.log(shopDetail)
    req.session.user = shopDetail;
    console.log(req.session.user)
    // console.log(details)
    res.render("s_edit/s_edit", {
        userId: shopDetail
    });
    return;
});

router.put("/edit/shop/:id", async (req, res) => {
    var idd = req.params.id;
    let shopkeeper_info = req.body;
    // if(!(ObjectId.isValid(req.params.id))){
    //     res.status(400).render("s_edit/s_edit", {"error" : "There is no session created for this id"});
    // }
    if (!shopkeeper_info) {
        res.status(400).render("s_edit/s_edit", {
            "error": "Must provide every details in the edit form"
        });
        return;
    }
    if (!shopkeeper_info.ShopName) {
        res.status(400).render("s_edit/s_edit", {
            "error": "Must provide the Shop name"
        });
        return;
    }
    if (!shopkeeper_info.username) {
        res.status(400).render("s_edit/s_edit", {
            "error": "Must provide username"
        });
        return;
    }
    if (!shopkeeper_info.ownerFirstname) {
        res.status(400).render("s_edit/s_edit", {
            "error": "Must provide First name"
        });
        return;
    }
    if (!shopkeeper_info.ownerLastname) {
        res.status(400).render("s_edit/s_edit", {
            "error": "Must provide Last name"
        });
        return;
    }
    if (!shopkeeper_info.email) {
        res.status(400).render("s_edit/s_edit", {
            "error": "Must provide email"
        });
        return;
    }
    if (!shopkeeper_info.phoneNumber) {
        res.status(400).render("s_edit/s_edit", {
            "error": "Must provide phone number"
        });
    }

    try {
        await shop.get(req.params.id)
    } catch (e) {
        res.status(500).json({
            error: "Internal server error"
        });
        return;
    }
    try {
        console.log(req.body.username);
        console.log(req.body.password);
        const newShopkeeper = await shop.updateShopkeeper(
            req.params.id,
            shopkeeper_info.ShopName,
            shopkeeper_info.username,
            shopkeeper_info.ownerFirstname,
            shopkeeper_info.ownerLastname,
            shopkeeper_info.Address,
            shopkeeper_info.email,
            shopkeeper_info.pincode,
            shopkeeper_info.phoneNumber
        );
        console.log(newShopkeeper);
        if (newShopkeeper.updateInserted) {
            res.redirect(`/shopId/${idd}`);
            console.log("EDIT//");
            return;
        }
    } catch (e) {
        res.status(400).render("s_edit/s_edit", {
            "error": e
        });
        return;
    }


    // try{
    //     await shop.get(req.params.id)
    // }
    // catch(e){
    //     res.status(404).json({error : "Restaurant not found"});
    //     return;
    // }
});

router.delete("/delete/:id", async (req, res) => {
    try {
        // const delete_id = await data.get(req.params.id);
        const remove_shop = await shop.removeShop(req.body.userId);
        if (remove_shop) {
            req.session.username = req.body.username;
            console.log(req.session.username);
            req.session.userId = existingUser.authenticatedUser._id.toString();
            console.log("Delete");
            if (remove_shop.deleted) {
                res.render("s_delete/s_delete", {
                    "message": "Account deleted successfully"
                });
                return;
            }
        }
    } catch (e) {
        //do nothing
    }
});


module.exports = router;

