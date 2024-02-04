const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model

// const orderedProductSchema = new mongoose.Schema({
//   product: {
//     type: mongoose.Types.ObjectId,
//     ref: 'Product'
//   },
//   size: String,
//   quantity: Number
// });

var orderSchema = new mongoose.Schema({
    user:{
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    products:[],
    amount: String,
    paymode: String,
    paystatus: {
      type: String,
      default: 'pending'
    },
    delstatus: {
      type: String,
      default: 'pending'
    },
    orderDate: String
});

//Export the model
module.exports = mongoose.model('Order', orderSchema);