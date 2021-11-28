const express = require('express');
const router = express.Router();
const data = require('../data');
const shop = data.shop;

router.get('/', async (req, res) => {
  try {
    //console.log("A")
    const restaurantList = await shop.getAll();
    //console.log(restaurantList)
    const data = {
      title: "All Shop",
      allShop: restaurantList,
    };
    res.render('allShop', data);
  } catch (e) {
    res.status(500).json({
      error: e
    });
  }
});


router.post('/', async (req, res) => {
  const shopData = req.body;
  const name = shopData.name;

  try {
    const shopData = await shop.create(name);
    // res.json(newPost);
    const data = {
      title: "All Shop",
      allShop: shopData,
    };
    response.render('allShop', data);
  } catch (e) {
    res.status(500).json({
      error: e
    });
  } 
});


module.exports = router;