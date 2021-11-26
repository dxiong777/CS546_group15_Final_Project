const {ObjectId} = require('bson');
const express = require('express');
//const { ConnectionClosedEvent } = require('mongodb');
const router = express.Router();
const data = require('../data/shopkeeper');

router.get("/", async(req,res)=>{
    if(req.session.username){
        res.redirect("/private");
        return;
    }
    else{
        res.render("s_login/s_login");
        return;
    }
});

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
            console.log(existingUser)
            if(existingUser.authenticated){
                req.session.username = req.body.username;
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
    res.render("s_private/s_private", {username : req.session.username});
    return;
});

router.get("/logout", async(req,res)=>{
    if(!req.session.username){
        res.redirect('/');
        return;
    }
    req.session.destroy();
    res.render("logout/logout")
});
module.exports = router;