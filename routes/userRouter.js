const express = require("express");
const router = express.Router();
const userModel = require("../models/userModel");
const createUser = require("../utils/createUser");
const genToken = require("../utils/generateToken")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

// render the signup page if the user is not logged in
router.get("/signup", (req, res)=>{
  try {
    const token = req.cookies.token
      if (token) {
      res.redirect("/shop")
  }else{
      res.render("signup")
  }
  } catch (error) {
    res.send(error.message)
  }
});

// registes new users to webapp
router.post("/signup", async (req, res)=>{
  try {
    const {name, email, password} = req.body;
    const existUser = await userModel.findOne({email})
    if(!existUser){
      createUser(name, email, password, res)
    } else {
      res.redirect("/")
    }
  } catch (error) {
    res.send(error.message);
  }
});

// handle user login request
router.post("/login", async (req, res)=>{
  const {email, password} = req.body
  try {
    const user = await userModel.findOne({email})
    if(user){
      bcrypt.compare(password, user.password, (err, result)=>{
        if(err){
          return res.send(err.message)
        }
        if(result){
          genToken(user, res)
          res.redirect("/shop")
        } else {
          res.send("Invalid user or password")
        }
      })
    }else{
      res.send("User not found")
    }
  } catch (error) {
    res.send(error.message)
  }
})

module.exports = router;
