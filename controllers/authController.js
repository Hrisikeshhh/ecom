const userModel = require("../models/userModel");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {generateToken} = require("../utils/generateToken")


module.exports.registerUser = function(req, res){
    async (req, res)=>{
    try{
let {email, password, fullname} = req.body;
await userModel.findOne({email: email});
if(user) return res.status(401).send("you already have an account, please login")

bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(myPlaintextPassword, salt, async function(err, hash) {
        if(err) return res.send(err.message);
        else{
            let user = await userModel.create({
    email,
    password:hash,
    fullname,
   })
   res.send(user);
   let token = generateToken(user);
   res.cookie("token",token);
        } 
    });
})
    }catch(err){
       console.log(err.message);
    }
   
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
 })
};