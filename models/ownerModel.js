const mongoose = require("mongoose");

const ownerSchema = mongoose.Schema({
  name: String,
  username: String,
  email: String,
  password: String,
  phone: Number,
  image: {
    type: String,
    default: "default.png"
  },
  products: {
    type: Array,
    default: []
  }
})

module.exports = mongoose.model("owner", ownerSchema);