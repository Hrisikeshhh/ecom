const express = require('express')
const router = express.Router();
const isLoggedin = require("../middlewares/isLoggedin");
const productModel = require('../models/productModel');

router.get('/',(req, res)=>{
  let error = req.flash("error")
  res.render("createAC",{error});
});



 router.get("/shop",isLoggedin,async function(req, res){
 let products = await productModel.find();
    res.render("shop",{products});
 })

 router.get("/login",function(req, res){
  res.render('login');
 })

 
module.exports = router;