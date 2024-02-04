const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
const ratingSchema = new mongoose.Schema({
  rating: Number,
  user: {
    type: mongoose.Types.ObjectId,
    ref: 'User'
  }
});

const reviewSchema = new mongoose.Schema({
  review: String,
  user: {
    type: mongoose.Types.ObjectId,
    ref: 'User'
  }
});

var productSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    brand:{
      type: String,
      required:true
    },
    category:{
      type: String,
      required:true
    },
    price:{
        type:Number,
        required:true,
    },
    images:[String],
    gender:{
      type: String,
      required:true
    },
    stock:{
      type:Number,
      required:true
    },
    details: String,
    ratings:{
      type:[ratingSchema],
    },
    reviews:{
      type:[reviewSchema],
    }
});

//Export the model
module.exports = mongoose.model('Product', productSchema);