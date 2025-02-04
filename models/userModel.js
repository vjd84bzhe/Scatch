const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: String,
  email: String,
  password: String,
  phone: Number,
  image: {
    type: String,
    default: "default.png",
  },
  cart: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "product",
    },
  ],
});

module.exports = mongoose.model("user", userSchema);
