const express = require('express');
const router = express.Router();
const data = require('../data');
const shopData = data.shop;
const productData = data.products;
const userData = data.user;
const productForSearch = data.productForSearch;
var mongoose = require('mongoose');

router.get('/', function (request, response) {
    const datta = {
        title: "Product Search"
    }
    response.render('productSearch', datta);
})

router.post("/search", async (req, res) => {
    const body = req.body;
    try {
      let productList = await productForSearch.getProductsViaSearch(body.search);
      let newProductList = [];
      for (product of productList) {
        if (product.reviews.length > 0) {
            product.rated = true;
        } else {
            product.rated = false;
        }
        newProductList.push(restaurant);
      }
  
      let userLoggedIn = false;
      let userId = req.session.AuthCookie;
      if(!userId) {
        userLoggedIn = false;
      } else {
        userLoggedIn = true;
      }
      
      if (productList.length > 0) {
        res.status(200).render("restaurants", { restaurants: newProductList , userLoggedIn: userLoggedIn });
      } else {
        res.status(200).render("search", { userLoggedIn: userLoggedIn });
      }
    } catch (e) {
      res.status(500).send();
    }
  })

module.exports = router;