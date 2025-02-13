const express = require("express");
const router = express.Router();
const productModel = require("../models/productModel")
const upload = require("../config/multerConfig")
const isLoggedin = require("../middlewares/isLoggedin")

// creates new products (admin)
router.post("/product/create", upload.single("productImage"), async (req, res)=>{
  const {name, description, price, stock, mrp, brand} = req.body
  try {
    const product = await productModel.create({
      name,
      description,
      price,
      stock,
      mrp,
      brand,
      image: req.file.buffer,
    })
    res.redirect("/owner/dashboard")
  } catch (error) {
    res.send(error.message)
  }
})

router.get("/product/:productId", isLoggedin, async (req, res)=>{
  const user = req.user
  const product = await productModel.findOne({_id: req.params.productId})
  user.cart.push(product)
  await user.save()
  res.redirect("/shop")
})

module.exports = router;