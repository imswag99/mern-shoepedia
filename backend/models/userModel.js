const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model

const addressSchema = new mongoose.Schema({
    house: String,
    locality: String,
    pincode: String,
    city: String,
    state: String,
    country: String
});

var userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    address:addressSchema,
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    isAdmin:{
        type:Boolean,
        default:false
    }
});

//Export the model
module.exports = mongoose.model('User', userSchema);