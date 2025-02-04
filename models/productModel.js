const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  image: String,
  category: String,
  stock: Number,
})

module.exports = mongoose.model("product", productSchema)