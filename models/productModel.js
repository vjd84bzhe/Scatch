const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  image: Buffer,
  category: String,
  stock: Number,
  mrp: Number,
  brand: String,
})

module.exports = mongoose.model("product", productSchema)