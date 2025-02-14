const express = require("express");
const router = express.Router();
const userModel = require("../models/userModel")
const productModel = require("../models/productModel")
const isLoggedin = require("../middlewares/isLoggedin");

// render the user login page
router.get("/", (req, res)=>{
  const token = req.cookies.token
  if(token){
    res.redirect("/shop")
  }else{
    res.render("index")
  }
});

// render shop if user logged in
router.get("/shop", isLoggedin, async (req, res)=>{
  const user = req.user
  const products = await productModel.find()
  res.render("products", {user, products})
})

// render the cart page 
router.get("/cart", isLoggedin, async (req, res)=>{
  const user = await userModel.findOne({email: req.user.email}).populate("cart")
  res.render("cart", {user})
})

// remove products from user cart
router.get("/cart/remove/:productId", isLoggedin, async (req, res)=>{
  const product = req.params.productId
  
  const user = await userModel.findOne({email: req.user.email})
  
  const productIndex = user.cart.indexOf(product)

  if (productIndex !== -1) {
    user.cart.splice(productIndex, 1)
    await user.save()
  } else {
    res.send("Product not found in cart")
  }
  res.redirect("/cart")
})

// user logout handler route
router.get("/logout", (req, res)=>{
  res.cookie("token", "")
  res.cookie("id", "")
  res.redirect("/")
})

module.exports = router;
