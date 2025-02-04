const jwt = require("jsonwebtoken")
const userModel = require("../models/userModel")

const isLoggedin = async (req, res, next)=>{
  const token = req.cookies.token
  
  if(!token){
    return res.redirect("/")
  }
  
  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET)
    const data = await userModel.findOne({email: decode.email}).select("-password")
    req.user = data
    next()
  } catch (error) {
    res.send("JWT error:", error.message)
  }  
}

module.exports = isLoggedin;