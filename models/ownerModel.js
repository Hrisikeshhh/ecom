const mongoose = require('mongoose');

const ownerSchema = mongoose.Schema({
    fullName :{
        type: String,
        trim: true,
    },
    email:String,
    password:String,
    products:{
        type:Array,
        default:[]
    },
    picture:String,
    gstin: String,
})


module.exports = mongoose.model('user',ownerSchema);

