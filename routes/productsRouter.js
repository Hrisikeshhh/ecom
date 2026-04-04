const express = require('express');
const router = express.Router();
const upload = require("../config/multer-config");
const productModel = require("../models/productModel")

router.post('/create',upload.single("image"),async function(req, res){
    try{
       let{image, name, price, discount} = req.body;
        let product = await productModel.create({
        image:req.file.buffer,
        name,
        price,
        discount
})
res.redirect('/owners/admin')
req.flash("success","product created succesfully")
    } catch(err){
       res.send(err.message)
    } 
 


})




module.exports = router;