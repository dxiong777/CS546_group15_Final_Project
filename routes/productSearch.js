const express = require('express');
const router = express.Router();
const data = require('../data');
const shopData = data.shop;
const productData = data.products;
const userData = data.user;
const productForSearch = data.productSearch;
const reviews = data.productReview;
const mongoCollections = require("../config/mongoCollections");
const productsForSearchCo = mongoCollections.productsForSearch;
var mongoose = require('mongoose');
const { ObjectId } = require('mongodb');

router.get('/', async function (request, response) {
    try {
      let productList = await productForSearch.getAllProducts();
      const datta = { products: productList};
      response.render('productSearch', datta);
    } catch (e) {
      console.log(e);
      response.status(500).send();
    }
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
          newProductList.push(product);
        }

  
      // let userLoggedIn = false;
      // let userId = req.session.AuthCookie;
      // if(!userId) {
      //   userLoggedIn = false;
      // } else {
      //   userLoggedIn = true;
      // }
      
      if (productList.length > 0) {
        res.status(200).render("productSearch", { products: productList});
      } else {
        res.status(200).render("productSearch", { });
      }
    } catch (e) {
      console.log(e);
      res.status(500).send();
    }
  })

  router.get("/:id", async (req, res) => {
    try {
      let product = await productForSearch.getProductForSearch(req.params.id);
      let reviewList = [];
      let userData = {}
      let userLoggedIn = false;
      let loggedInReviewer = false;
      let sumRating = 0;
      let totalRating = 0;
      let hasError = false;
      let error = [];
      try { // Get reviews of restaurant
        for (reviewId of product.reviews) {
          review = await reviews.getReview(reviewId);
          commentList = [];
          //Get Avg
          totalRating += 1;
          sumRating += parseInt(review.rating);
        
          //Rating Updates
          let avgRating = sumRating/totalRating;
          avgRating = avgRating.toFixed(2);
          const productCollection = await productsForSearchCo();
          const objIdForProduct = ObjectId.createFromHexString(req.params.id);
          const updated = await productCollection.updateOne({_id: objIdForProduct}, {$set: { rating: avgRating}})
          if(!updated.matchedCount && !updated.modifiedCount) res.status(500).json({ message: "Couldn't update rating" });

          // If this review is by the logged in user, let them edit it from here
          // if (req.session.AuthCookie === review.userId) {
          //   review.isReviewer = true;
          //   loggedInReviewer = true;
          // } else {
          //   review.isReviewer = false;
          //   loggedInReviewer = false;
          // }
          // review.user = await users.getUser(review.userId);
          reviewList.push(review); // This is a simple FIFO - can be improved or filtered in client JS

        }
      } catch (e) {
        console.log(e);
      }

      // let userId = req.session.AuthCookie;
      // if(!userId) {
      //   userLoggedIn = false;
      // } else {
      //   userLoggedIn = true;
      //   userData = await users.getUser(userId);
      //   userData.reviewedRestaurantPage = reviewList.some(item => item.userId === String(userData._id));
      // }
      product = await productForSearch.getProductForSearch(req.params.id);
      res.status(200).render("productDetail", { product: product, reviews: reviewList, userLoggedIn: userLoggedIn, loggedInReviewer: loggedInReviewer, currentUserData: userData, hasError: hasError, error: error})
    } catch (e) {
      res.status(404).json({ message: "product not found!" });
    }
});

module.exports = router;