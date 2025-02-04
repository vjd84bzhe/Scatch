const express = require("express");
const router = express.Router();
const userModel = require("../models/userModel")
const productModel = require("../models/productModel")
const isLoggedin = require("../middlewares/isLoggedin");

router.get("/", (req, res)=>{
  const token = req.cookies.token
  if(token){
    res.redirect("/shop")
  }else{
    res.render("index")
  }
});

// render shop if user logged in
router.get("/shop", isLoggedin, (req, res)=>{
  res.render("products")
})

router.get("/logout", (req, res)=>{
  res.cookie("token", "")
  res.cookie("id", "")
  res.redirect("/")
})

module.exports = router;
