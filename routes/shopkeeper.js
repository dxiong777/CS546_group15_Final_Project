const {ObjectId} = require('bson');
const express = require('express');
//const { removeShop } = require('../data/shopkeeper');
//const { ConnectionClosedEvent } = require('mongodb');
const router = express.Router();
const data = require('../data/shopkeeper');

router.get("/", async(req,res)=>{
    res.render("pages/home");
});

router.get("/shopkeeper", async(req, res) => {
    if(req.session.username){
        res.redirect("/private");
        return;
    }
    else{
        res.render("s_login/s_login");
        return;
    }
})

router.get("/signup", async(req,res)=>{
    if(req.session.username){
        res.redirect("/private");
        return;
    }
    else{
        res.render("s_signup/s_signup");
        return;
    }
});

router.post("/signup", async(req,res)=>{
    try{
        try{
            console.log(req.body.username);
            console.log(req.body.password);
            const newShopkeeper = await data.createShopkeeper(req.body.ShopName, req.body.username, req.body.ownerFirstname, req.body.ownerLastname, req.body.Address, req.body.email, req.body.pincode, req.body.phoneNumber, req.body.password);
            if(newShopkeeper.userInsterted){
                res.redirect("/");
                return;
            }
        }
        catch(e){
                res.status(400).render("s_signup/s_signup", {"error" : e});
                return;
        }
    }
    catch(e){
        res.status(500).json({error : "Internal server error"});
        return;
    }
});

router.post("/login", async(req,res)=>{
    try{
        try{
            console.log(req.body.username);
            console.log(req.body.password);
            const existingUser = await data.checkShopkeeper(req.body.username, req.body.password);
            req.session.user=existingUser;
            console.log(existingUser)
            if(existingUser){
                req.session.username = req.body.username;
                req.session.userId = existingUser.authenticatedUser._id.toString();
                res.redirect("/private");
                return;
            }
            else{
                res.status(400).render("s_login/s_login", {"error" : "Invalid username or password"});
            }
        }
        catch(e){
            console.log(e);
            res.status(400).render("s_login/s_login", {"error" : "Either the username or password is incorrect"});
        }
    }
    catch(e){
        res.status(500).json({error : "Internal server error"});
    }
});

router.get("/private", async(req,res)=>{
    try{
    const User = await data.get(req.session.userId);
    console.log(User);
    if(User){
        // req.session.username = req.body.username;
        // req.session.userId = User._id.toString();
        res.render("s_private/s_private", {username : User.username});
        return;
    }
    }
    catch(e){
        console.log(e);
    }
});

router.get("/logout", async (req,res)=>{
    console.log('inside logout')
    if(!req.session.username){
        res.redirect('/');
        return;
    }
    req.session.destroy();
    res.render("logout/logout");
    return;
});

router.get("/edit", async(req,res)=>{
    let details = req.session.user.authenticatedUser
    res.render("s_edit/s_edit", { userId : details});
    return;
});

router.put("/edit/:id", async(req,res)=>{
    let shopkeeper_info = req.body;
    // if(!(ObjectId.isValid(req.params.id))){
    //     res.status(400).render("s_edit/s_edit", {"error" : "There is no session created for this id"});
    // }
    if(!shopkeeper_info){
        res.status(400).render("s_edit/s_edit", {"error": "Must provide every details in the edit form"});
        return;
    }
    if(!shopkeeper_info.ShopName){
        res.status(400).render("s_edit/s_edit", {"error": "Must provide the Shop name"});
        return;
    }
    if(!shopkeeper_info.username){
        res.status(400).render("s_edit/s_edit", {"error" : "Must provide username"});
        return;
    }
    if(!shopkeeper_info.ownerFirstname){
        res.status(400).render("s_edit/s_edit", {"error" : "Must provide First name"});
        return;
    }
    if(!shopkeeper_info.ownerLastname){
        res.status(400).render("s_edit/s_edit", {"error" : "Must provide Last name"});
        return;
    }
    if(!shopkeeper_info.email){
        res.status(400).render("s_edit/s_edit", {"error" : "Must provide email"});
        return;
    }
    if(!shopkeeper_info.phoneNumber){
        res.status(400).render("s_edit/s_edit", {"error" : "Must provide phone number"});
    }

    try{
        await data.get(req.params.id)
    }
    catch(e){
        res.status(500).json({error : "Internal server error"});
        return;
    }
        try{
            console.log(req.body.username);
            console.log(req.body.password);
            const newShopkeeper = await data.updateShopkeeper(
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
            if(newShopkeeper.updateInserted){
                res.redirect("/private");
                console.log("EDIT//");
                return;
            }
        }
        catch(e){
                res.status(400).render("s_edit/s_edit", {"error" : e});
                return;
        }
    

    // try{
    //     await data.get(req.params.id)
    // }
    // catch(e){
    //     res.status(404).json({error : "Restaurant not found"});
    //     return;
    // }
});

router.delete("/delete/:id", async(req,res)=>{
    try{
        // const delete_id = await data.get(req.params.id);
        const remove_shop = await data.removeShop( req.body.userId);
       if(remove_shop){
        req.session.username = req.body.username;
        console.log(req.session.username);
        req.session.userId = existingUser.authenticatedUser._id.toString();
        console.log("Delete");
        if(remove_shop.deleted){
        res.render("s_delete/s_delete", {"message" : "Account deleted successfully"});
         return;
        }
       }
    }
    catch(e){
        //do nothing
    }
});

module.exports = router;