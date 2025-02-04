const bcrypt = require("bcrypt");
const genToken = require("../utils/generateToken")
const userModel = require("../models/userModel");

const createUser = (name, email, password, res) => {
  bcrypt.genSalt(12, (error, result) => {
    bcrypt.hash(password, result, async (err, hash) => {
      if (err) {
        res.send(err.message);
      } else {
        const user = await userModel.create({
          name,
          email,
          password: hash,
        });
        // generate token
        genToken(user, res);
        res.redirect("/shop");
      }
    });
  });
};
module.exports = createUser;
