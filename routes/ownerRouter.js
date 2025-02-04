const express = require("express");
const router = express.Router();
const ownerModel = require("../models/ownerModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
const loggedinAdmin = require("../middlewares/loggedinAdmin")

// render admin login page
router.get("/admin", (req, res)=>{
  res.render("adminPanel", {message: req.flash("error")})
});

// render create admin page
router.get("/admin/register", (req, res)=>{
  res.render("registerOwner")
});

// create new admin
router.post("/admin/create", async (req, res)=>{
  const {name, email, password}= req.body
  try {
    const owner = await ownerModel.findOne({email})
    if (owner) {
      res.send("Account already exists")
    }else{
      bcrypt.genSalt(12, (error, salt)=>{
        bcrypt.hash(password, salt, async (error, hash)=>{
          if(error){
            return res.send(error.message)
          }
          const owner = await ownerModel.create({
            name,
            email,
            password: hash,
          })
          const token = jwt.sign({email, id: owner._id}, process.env.JWT_SECRET)
      res.cookie("token", token)
        })
        
      })
        res.redirect("/owner/dashboard")
    }
  } catch (error) {
    res.send(error.message)
  }
})

// login to admin panel
router.post("/admin/login", async (req, res)=>{
  const {email, password} = req.body
  try {
    const owner = await ownerModel.findOne({email})
    if (!owner) {
      res.send("accout does not exist")
    }else{
      bcrypt.compare(password, owner.password, (err, result)=>{
        if(result){
          const token = jwt.sign({email, id: owner._id}, process.env.JWT_SECRET)
          res.cookie("admin", token)
          res.redirect("/owner/dashboard")
        } else {
          res.send("Invalid credintials")
        }
      })
    }
  } catch (error) {
    res.send(error.message)
  }
})

// render the admin dashboard
router.get("/dashboard", loggedinAdmin, async (req, res)=>{
  res.render("createProduct")
})

// logout the admin
router.get("/logout", (req, res)=>{
  res.cookie("token", "")
  res.cookie("admin", "")
  res.redirect("/owner/admin")
})

module.exports = router;