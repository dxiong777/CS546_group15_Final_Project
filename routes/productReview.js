const express = require("express");
const router = express.Router();
const data = require('../data/');
const reviews = data.productReview;
const users = data.user;
const productForSearch = data.productSearch;
const { ObjectId } = require('mongodb');
const { user } = require("../config/mongoCollections");

router.get("/:id", async (req, res) => {
    let isReviewer = false;
      try {
        const review = await reviews.getReview(req.params.id);
        const user = await users.getUser(review.userId);
        const restaurant = await restaurants.getRestaurant(review.restaurantId);
        // if the reviewer is on the page, give them a button to edit
        if(req.session.AuthCookie === review.userId) {
          isReviewer = true;
        }
        res.status(200).render("review", { review: review, user: user, restaurant: restaurant, isReviewer: isReviewer, id: req.params.id });
      } catch (e) {
        res.status(404).json({ message: "review not found!" });
      }
  });

  router.post("/:id/add", async (req, res) => {
    const data = req.body;
    const rating = data.rating;
    const reviewText = data.reviewText;
    let hasError = false;
    let error = [];
    if (rating > 5 || rating < 1) {
      hasError = true;
      error.push("Rating must be a number between 1 and 5");
      let product = await productForSearch.getProductForSearch(req.params.id);
        let reviewList = [];
        let userData = {}
        let userLoggedIn = false;
        let loggedInReviewer = false;
        let sumRating = 0;
        let totalRating = 0;
  
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
            const restCollection = await rest();
            const objIdForRes = ObjectId.createFromHexString(req.params.id);
            const updated = await restCollection.updateOne({_id: objIdForRes}, {$set: { rating: avgRating}})
            if(!updated.matchedCount && !updated.modifiedCount) res.status(500).json({ message: "Couldn't update rating" });
  
            // If this review is by the logged in user, let them edit it from here
            if (req.session.AuthCookie === review.userId) {
              review.isReviewer = true;
              loggedInReviewer = true;
            } else {
              review.isReviewer = false;
              loggedInReviewer = false;
            }
            review.user = await users.getUser(review.userId);
            reviewList.push(review); // This is a simple FIFO - can be improved or filtered in client JS
  
          }
        } catch (e) {
          console.log(e);
        }
  
        let userId = req.session.AuthCookie;
        if(!userId) {
          userLoggedIn = false;
        } else {
          userLoggedIn = true;
          userData = await users.getUser(userId);
        }
      return res.status(403).render("productDetail", { product: product, reviews: reviewList, userLoggedIn: userLoggedIn, loggedInReviewer: loggedInReviewer, currentUserData: userData, hasError: hasError, error: error});
    }
    try {
      const reviewRating = req.body.rating;
      const reviewText = req.body.reviewText;
      var finalImg = ""
      console.log(req.file);
      if(!req.file){
        finalImg = "";
      } else {
        var img = fs.readFileSync(req.file.path);
        var encode_image = img.toString('base64');
        finalImg = {
          contentType: req.file.mimetype,
            image: Buffer.from(encode_image, 'base64')
        };
      }
      
      let userId = req.session.AuthCookie;
      let productId = req.params.id;
      const reviewForRes = await reviews.addReview(productId, userId, reviewText, Number(reviewRating));
      console.log(reviewForRes);
      const redirectURL = "/productSearch/" + productId;
      return res.redirect(redirectURL);
    } catch (e) {
      // Something went wrong with the server!
      res.status(404).send();
    }
  });

  router.get("/", async (req, res) => {
    try {
      return res.redirect("productSearch");
    } catch (e) {
      // Something went wrong with the server!
      res.status(404).send();
    }
});

module.exports = router;