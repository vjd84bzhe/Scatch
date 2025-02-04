const express = require("express");
const router = express.Router();
const userModel = require("../models/userModel")
const productModel = require("../models/productModel")
const isLoggedin = require("../middlewares/isLoggedin");
const multer = require("../config/multerConfig")

// render the shop page if user is logged in
router.get("/", isLoggedin, async (req, res)=>{
  const user = await userModel.findOne({_id: req.cookies.id})
  const products = await productModel.find()
  res.render("products", {user, products})
})

router.post("/product/create", upload.single(productImage), (req, res)=>{
  const {name, description, price, stock} = req.body

  try {
    productModel.create{
      name,
        description,
        price,
        stock,
        image: req.file.filename,
    }
  } catch (error) {
    res.send(error.message)
  }
})

module.exports = router;