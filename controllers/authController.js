const userModel = require("../models/userModel");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {generateToken} = require("../utils/generateToken")

module.exports.registerUser = async (req, res)=>{
let {email, password, fullName} = req.body;
let user = await userModel.findOne({email: email});
if(user){
    return res.status(401).send("you already have an account, please login")
}else{
bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(password, salt, async function(err, hash) {
        if(err) return res.send(err.message);
        else{
            let user = await userModel.create({
    email,
    password:hash,
    fullName,
   })
   let token = generateToken(user);
   res.cookie("token",token);
   res.redirect('/shop')
        } 
    });
})
}
}


module.exports.loginUser = async function(req, res){
 let {email, password} = req.body;

 let user = await userModel.findOne({email: email});
 if(!user) return res.send('email or password is incorrect');

 bcrypt.compare(password, user.password, function(err, result){
  if(result)
  {
    let token = generateToken(user);
    res.cookie("token",token);
  }
   res.redirect('/shop')
 })
 
};

module.exports.logout = async function(req, res){
     res.cookie("token","");
     res.redirect("/login")
}